
import { Product, searchProducts } from './productService';

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  products?: Product[];
  status?: 'success' | 'warning' | 'error';
  statusMessage?: string;
}

// Process user message and generate AI response
export const processUserMessage = async (
  userMessage: string,
  balance: number
): Promise<Message> => {
  try {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    let responseMessage: Message = {
      id: Date.now().toString(),
      sender: 'assistant',
      text: "I can help you find products on Amazon. Try asking me about toys, electronics, books, or clothes for kids!",
      timestamp: new Date(),
    };
    
    const message = userMessage.toLowerCase();
    
    // Handle product search requests
    if (
      message.includes('find') || 
      message.includes('search') || 
      message.includes('looking for') || 
      message.includes('show me') ||
      message.includes('get me')
    ) {
      const products = await searchProducts(message);
      
      if (products.length > 0) {
        responseMessage = {
          id: Date.now().toString(),
          sender: 'assistant',
          text: `I found ${products.length} product${products.length > 1 ? 's' : ''} that might interest you:`,
          timestamp: new Date(),
          products: products,
        };
      } else {
        responseMessage = {
          id: Date.now().toString(),
          sender: 'assistant',
          text: "I couldn't find any products matching your search. Try asking for something else like toys, watches, or headphones.",
          timestamp: new Date(),
        };
      }
    } 
    // Handle purchase intent
    else if (message.includes('buy') || message.includes('purchase')) {
      responseMessage = {
        id: Date.now().toString(),
        sender: 'assistant',
        text: "I'll help you purchase that! Before we proceed, let me check your balance and get parental approval.",
        timestamp: new Date(),
        status: 'warning',
        statusMessage: 'Waiting for parent approval',
      };
    }
    // Handle balance inquiry
    else if (message.includes('balance') || message.includes('how much') || message.includes('money')) {
      responseMessage = {
        id: Date.now().toString(),
        sender: 'assistant',
        text: `Your current balance is $${balance.toFixed(2)}. Is there something specific you'd like to buy?`,
        timestamp: new Date(),
      };
    }
    // Handle greetings
    else if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
      responseMessage = {
        id: Date.now().toString(),
        sender: 'assistant',
        text: "Hi there! I'm your Shopmeai shopping assistant. What would you like to shop for today?",
        timestamp: new Date(),
      };
    }
    
    return responseMessage;
  } catch (error) {
    console.error('Error processing message:', error);
    return {
      id: Date.now().toString(),
      sender: 'assistant',
      text: "I'm having trouble processing your request right now. Could you try again?",
      timestamp: new Date(),
      status: 'error',
      statusMessage: 'Processing error',
    };
  }
};
