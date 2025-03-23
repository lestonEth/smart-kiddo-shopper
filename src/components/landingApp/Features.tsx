import { LightbulbIcon, ShieldCheck, CreditCard, BrainCircuit } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Features = () => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        };

        observerRef.current = new IntersectionObserver(observerCallback, {
            threshold: 0.1
        });

        const elements = document.querySelectorAll('.reveal-item');
        elements.forEach(el => observerRef.current?.observe(el));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    const features = [
        {
            icon: <LightbulbIcon className="w-12 h-12 text-primary" />,
            title: 'Smart Recommendations',
            description: 'AI-powered product suggestions tailored to children\'s interests, age, and parents\' preferences.'
        },
        {
            icon: <ShieldCheck className="w-12 h-12 text-primary" />,
            title: 'Parent Approval',
            description: 'Every purchase requires parental approval, with customizable spending limits and product filters.'
        },
        {
            icon: <CreditCard className="w-12 h-12 text-primary" />,
            title: 'Secure Transactions',
            description: 'Bank-level security ensures safe transactions, with parental controls for payment methods.'
        },
        {
            icon: <BrainCircuit className="w-12 h-12 text-primary" />,
            title: 'Learning Experience',
            description: 'Educational platform that teaches children about budgeting, decision-making, and responsible shopping.'
        }
    ];

    return (
        <section id="features" className="py-24 px-6 md:px-12 bg-white relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-blue-100 text-blue-600 font-medium text-sm reveal-item opacity-0 animate-fade-in">
                        <span>Smart Features</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal-item opacity-0 animate-fade-in-delay-1">
                        Intelligent Shopping, <span className="text-gradient">Better Decisions</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg reveal-item opacity-0 animate-fade-in-delay-2">
                        Our AI assistant combines cutting-edge technology with parental oversight to create a safe, educational shopping experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col items-start reveal-item opacity-0"
                            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                        >
                            <div className="p-3 bg-blue-50 rounded-xl mb-5">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl reveal-item opacity-0 animate-fade-in">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-blue-100 text-blue-600 font-medium text-sm">
                                <span>How It Works</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Simple, Safe, and Educational</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-3 mt-0.5">1</div>
                                    <div>
                                        <h4 className="font-medium">Child Interaction</h4>
                                        <p className="text-muted-foreground">Children chat with the AI assistant about their shopping interests.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-3 mt-0.5">2</div>
                                    <div>
                                        <h4 className="font-medium">Smart Recommendations</h4>
                                        <p className="text-muted-foreground">AI suggests age-appropriate products within parent-set guidelines.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-3 mt-0.5">3</div>
                                    <div>
                                        <h4 className="font-medium">Parental Approval</h4>
                                        <p className="text-muted-foreground">Parents receive notifications to approve purchases.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-3 mt-0.5">4</div>
                                    <div>
                                        <h4 className="font-medium">Secure Purchase</h4>
                                        <p className="text-muted-foreground">Approved items are securely purchased through parent-linked payment.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="order-1 lg:order-2 flex justify-center">
                            <div className="relative w-72 h-72">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 animate-pulse"></div>
                                <div className="absolute inset-4 bg-white rounded-full shadow-lg flex items-center justify-center">
                                    <img
                                        src="https://cdn.pixabay.com/photo/2023/06/05/09/18/ai-generated-8041556_1280.jpg"
                                        alt="Child using AI assistant"
                                        className="w-48 h-48 object-cover rounded-full"
                                    />
                                </div>
                                <div className="absolute -right-2 top-1/4 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center animate-float">
                                    <LightbulbIcon className="w-8 h-8 text-yellow-400" />
                                </div>
                                <div className="absolute -left-2 bottom-1/4 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                                    <ShieldCheck className="w-8 h-8 text-green-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
