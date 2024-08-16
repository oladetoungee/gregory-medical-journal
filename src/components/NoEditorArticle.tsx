import Link from 'next/link';

const NoEditorArticle = () => {
    return (
        <section className="bg-gray-100 rounded-lg p-6 mb-8 mt-2 shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Editor's Selection</h1>
        <p className="text-sm sm:text-base text-primary mb-4 text-center">
            Currently, there is no specific editor's pick for this period. However, we invite you to explore some of our most insightful articles and recent publications. We are committed to providing you with top-notch content that inspires and informs.
        </p>
        <p className="text-sm sm:text-base mb-4 text-center">
            Our editorial team is always on the lookout for exceptional research and impactful studies. Stay tuned for updates on our latest selections and recommendations.
        </p>
        <div className="flex items-center justify-center mt-6">
            <Link href="/articles" className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors">
                Explore Articles
            </Link>
        </div>
    </section>
    );
    }

export default NoEditorArticle;