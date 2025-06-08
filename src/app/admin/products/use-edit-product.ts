import { useState, useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { upProductBody, UpdateProductBodyType, Category, ProductDetailRes } from '@/schemaValidations/product.schema';
import envConfig from '../../../../config';
import { ProductResponseType, UpdateProductSchema, UpdateProductType } from '@/schemaValidations/product.schema';
import { CategoryListResponseType, CategoryType } from '@/schemaValidations/category.schema';

interface UseEditProductFormProps {
    id?: string;
    onClose: () => void;
    onSubmitSuccess?: () => void;
}

export const useEditProductForm = ({ id, onClose, onSubmitSuccess }: UseEditProductFormProps) => {
    const [file, setFile] = useState<File | undefined>();
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<UpdateProductType>({
        resolver: zodResolver(UpdateProductSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            stock_quantity: 0,
            category_id: '',
            product_image: '',
        },
    });

    const productImage = form.watch('product_image');

    const previewImage = useMemo(() => {
        if (file) return URL.createObjectURL(file);
        return productImage || '';
    }, [file, productImage]);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

                const [productRes, categoriesRes] = await Promise.all([
                    fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/detail?id=${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/category/get-all-categories`, {
                        // headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                if (!productRes.ok) throw new Error('Lỗi khi lấy chi tiết sản phẩm');
                if (!categoriesRes.ok) throw new Error('Lỗi khi lấy danh sách danh mục');

                const productData: ProductResponseType = await productRes.json();
                const categoriesData: CategoryListResponseType = await categoriesRes.json();
                
                // Reset form với dữ liệu sản phẩm
                if (productData.product) {
                    form.reset(productData.product);
                }
                

                setCategories(categoriesData || []);

            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, form.reset]);

    const handleFormSubmit = async (data: UpdateProductType) => {
        if (!id) return;
        setIsLoading(true);
        try {
            const formData = new FormData();
            
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && key !== 'product_image') {
                    formData.append(key, String(value));
                }
            });

            if (file) {
                formData.append('product_image', file);
            } else if (data.product_image) {
                formData.append('product_image', data.product_image);
            }
            
            await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/update?id=${id}`, {
                method: 'POST', 
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                body: formData,
            });

            setFile(undefined);
            onSubmitSuccess?.();
            onClose();
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        isLoading,
        categories,
        previewImage,
        avatarInputRef,
        handleFormSubmit,
        setFile,
    };
};