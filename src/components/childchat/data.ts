import { Product, CharacterVariants } from '@/types/types';

export const sampleProducts: Product[] = [
    {
        id: 1,
        name: "Super Cool Robot Toy",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=500&auto=format",
        description: "A fun interactive robot that walks, talks and dances!",
        rating: 4.5
    },
    {
        id: 2,
        name: "Magic Science Kit",
        price: 24.95,
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&auto=format",
        description: "Learn amazing science tricks with this complete kit!",
        rating: 4.8
    },
    {
        id: 3,
        name: "Dinosaur Puzzle Set",
        price: 12.50,
        image: "https://images.unsplash.com/photo-1575364289437-fb16240b2b78?w=500&auto=format",
        description: "A set of 3 wooden dinosaur puzzles for hours of fun!",
        rating: 4.3
    },
    {
        id: 4,
        name: "Colorful Art Supplies",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format",
        description: "Complete art kit with markers, crayons, and colored pencils!",
        rating: 4.7
    }
];

export const characterVariants: CharacterVariants = {
    idle: {
        y: [0, -5, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    },
    talking: {
        y: [0, -3, 0],
        rotate: [0, 1, 0, -1, 0],
        transition: {
            duration: 0.3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    },
    listening: {
        scale: [1, 1.05, 1],
        filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
        transition: {
            duration: 0.7,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24
        }
    }
};