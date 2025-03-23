import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ShoppingCart, Star } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: string;
    category: string;
    rating: number;
    image: string;
}

const ProductCarousel = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const products: Product[] = [
        {
            id: 1,
            name: "Space Explorer Science Kit",
            price: "$39.99",
            category: "Educational",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1518331483807-f6adb0e1ad23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 2,
            name: "Interactive Storybook",
            price: "$24.99",
            category: "Books",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1498&q=80"
        },
        {
            id: 3,
            name: "Eco-Friendly Art Set",
            price: "$19.99",
            category: "Crafts",
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
        },
        {
            id: 4,
            name: "Coding Robot Kit",
            price: "$59.99",
            category: "STEM",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1406&q=80"
        },
        {
            id: 5,
            name: "Digital Adventure Game",
            price: "$29.99",
            category: "Games",
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 6,
            name: "Nature Explorer Kit",
            price: "$34.99",
            category: "Outdoor",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1501003878151-d3cb87799705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        }
    ];

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

    const scrollCarousel = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = 320; // Approximate width of a product card + margin
            const currentScroll = carouselRef.current.scrollLeft;

            carouselRef.current.scrollTo({
                left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
                behavior: 'smooth'
            });

            if (direction === 'left' && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            } else if (direction === 'right' && currentIndex < products.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        }
    };

    return (
        <section id="products" className="py-24 px-6 md:px-12 bg-gradient-to-b from-white to-blue-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-blue-100 text-blue-600 font-medium text-sm reveal-item opacity-0 animate-fade-in">
                        <span>Product Recommendations</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal-item opacity-0 animate-fade-in-delay-1">
                        AI-Curated for <span className="text-gradient">Young Shoppers</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg reveal-item opacity-0 animate-fade-in-delay-2">
                        Discover products tailored to children's interests with our AI recommendations, all pre-screened for safety and educational value.
                    </p>
                </div>

                <div className="relative mb-10 reveal-item opacity-0 animate-fade-in-delay-3">
                    <div
                        ref={carouselRef}
                        className="flex overflow-x-auto pb-6 hide-scrollbar gap-6 snap-x snap-mandatory"
                    >
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className="min-w-[280px] max-w-[280px] flex-shrink-0 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden snap-start"
                            >
                                <div className="relative h-40 bg-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-semibold shadow-sm">
                                        {product.category}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center mb-2">
                                        <div className="flex items-center">
                                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                            <span className="ml-1 text-sm font-medium">{product.rating}</span>
                                        </div>
                                        <span className="mx-2 text-gray-300">•</span>
                                        <span className="text-xs text-muted-foreground">Parent Approved</span>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="font-bold text-primary">{product.price}</span>
                                        <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                            <ShoppingCart size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => scrollCarousel('left')}
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-foreground hover:bg-gray-50 transition-colors z-10"
                        disabled={currentIndex === 0}
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <button
                        onClick={() => scrollCarousel('right')}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-foreground hover:bg-gray-50 transition-colors z-10"
                        disabled={currentIndex === products.length - 1}
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>

                <div className="flex justify-center mt-6 reveal-item opacity-0 animate-fade-in-delay-4">
                    <div className="flex space-x-2">
                        {Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-colors duration-300 ${Math.floor(currentIndex / 3) === index ? 'bg-primary' : 'bg-gray-200'
                                    }`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductCarousel;