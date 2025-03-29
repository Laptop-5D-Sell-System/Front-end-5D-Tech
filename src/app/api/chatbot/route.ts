import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();
        console.log('Received message:', message);

        if (!message) {
            return NextResponse.json({ error: 'Missing message' }, { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error('❌ API Key missing');
            return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            }),
        });

        if (!response.ok) {
            console.error('❌ OpenAI API Error:', response.status, response.statusText);
            return NextResponse.json({ error: 'OpenAI API Error' }, { status: response.status });
        }

        const data = await response.json();
        console.log('✅ OpenAI API Response:', data);

        return NextResponse.json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error('❌ Internal Server Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
