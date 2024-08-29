'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import termsOfUse from '@/constants/termsOfUse';
import { Typewriter } from '@/components';

interface TermsOfUse {
    id: number;
    term: string;
    desc: string;
  }
  
const TermsOfUse = () => {
    const [terms, setTerms] = useState<TermsOfUse[]>([]);

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/term-of-uses`
                  );

                const termsOfUses = res.data.data.map((data: any) => ({
                    id: data.id,
                    term: data.attributes.term,
                    desc: data.attributes.desc
                }));

                setTerms(termsOfUses);
            } catch (error) {
                console.log('error getting terms:', error);
            }
        };

        fetchTerms();
    }, []);

    return (
        <div className="mt-12 py-12 px-6 sm:px-12 lg:px-12 bg-white">
            <div className="container mx-auto space-y-8">
                <Typewriter
                    text="Terms of Use"
                    className="page-header"
                />
                <p className="md:text-base tex-sm text-sec">
                By using Gregory Medical Journal's website, you agree to comply with these terms of use. Please read them carefully before accessing our services.
                </p>
                {terms.map((term) => (
                    <div key={term.id} className="space-y-4 mt-2">
                        <h2 className="md:text-xl text-base font-semibold text-primary">{term.term}</h2>
                        <p className="text-sec">{term.desc}</p>
                        <hr className="border-t border-gray-300 my-2" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TermsOfUse;
