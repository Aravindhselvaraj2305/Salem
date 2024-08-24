import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';

type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type Cart = {
  [key: string]: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'A', quantity: 10, price: 300 },
    { id: '2', name: 'B', quantity: 0, price: 500 },
    { id: '3', name: 'C', quantity: 8, price: 200 },
    { id: '4', name: 'D', quantity: 2, price: 10000 },
    { id: '5', name: 'E', quantity: 4 , price: 300 },
    { id: '6', name: 'F', quantity: 3, price: 500 },
    { id: '7', name: 'G', quantity: 1, price: 200 },
    { id: '8', name: 'H', quantity: 5, price: 10000 },
  ]);

  const [cart, setCart] = useState<Cart>({});
  const [totalPrice, setTotalPrice] = useState(0);

  const updateQuantity = (id: string, change: number) => {
    setProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === id) {
          const selected = (cart[id] || 0) + change;

          if (selected < 0 || selected > product.quantity) return product;

          setCart(prevCart => ({
            ...prevCart,
            [id]: selected,
          }));

          return product;
        }
        return product;
      });
    });
  };

  useEffect(() => {
    const price = products.reduce((sum, product) => {
      return sum + ((cart[product.id] || 0) * product.price);
    }, 0);
    setTotalPrice(price);
  }, [cart, products]);

  return (
    <ScrollView style={{ padding: 20, backgroundColor: 'white' }}>
      {products.map(product => (
        <View key={product.id} style={{ marginBottom: 20, flexDirection:'row', justifyContent:'space-around' }}>
          <Text style={{ fontSize: 18 }}>{product.name}</Text>
          <Text style={{ fontSize: 16 }}>Available: {product.quantity - (cart[product.id] || 0)}</Text>
          <Text style={{ fontSize: 16 }}>Price: {product.price}</Text>
          <View style={{ flexDirection: 'row'}}>
            <Button title="-" onPress={() => updateQuantity(product.id, -1)} />
            <TextInput
              style={{ marginHorizontal: 10, textAlign: 'center', width: 20 }}
              value={`${cart[product.id] || 0}`}
              editable={false}
            />
            <Button title="+" onPress={() => updateQuantity(product.id, 1)} />
          </View>
        </View>
      ))}
      <Button title="Checkout" onPress={() => alert(`Total: Rupees:${totalPrice}`)} />
    </ScrollView>
  );
}
