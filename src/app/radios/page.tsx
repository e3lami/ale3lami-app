import Header from '@/components/layout/header';
import SectionHeader from '@/components/home/section-header';

export default function RadiosPage() {
    const radioPageUrl = "https://ale3lami.com/%d8%a7%d8%b0%d8%a7%d8%b9%d8%a7%d8%aa-%d9%84%d8%a8%d9%86%d8%a7%d9%86%d9%8a%d8%a9-%d8%a7%d9%88%d9%86-%d9%84%d8%a7%d9%8a%d9%86/";

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <SectionHeader title="إذاعات لبنانية" />
                <div className="aspect-video w-full mt-6">
                    <iframe
                        src={radioPageUrl}
                        className="w-full h-full border-0 rounded-lg shadow-lg"
                        title="Lebanese Radios"
                        // sandbox attribute can improve security but might break functionality
                        // sandbox="allow-scripts allow-same-origin"
                    ></iframe>
                </div>
                 <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-700 text-yellow-300 rounded-lg text-center">
                    <p>قد لا تعمل بعض محطات الراديو بسبب قيود البث من المصدر.</p>
                </div>
            </main>
        </>
    )
}
