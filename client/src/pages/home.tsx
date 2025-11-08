import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertEmailSubscriptionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Mail, Phone, MapPin, Bell, Instagram, Facebook, MessageCircle } from "lucide-react";
import { SiTiktok, SiWhatsapp } from "react-icons/si";
import sipBiteLogo from "@assets/SIP & Bite Logo 1_1753587765006.png";
import instagramQR from "@assets/IGQR_1753587826711.jpg";
import type { z } from "zod";

type EmailFormData = z.infer<typeof insertEmailSubscriptionSchema>;

const floatingFruits = [
  { emoji: "🍊", size: "text-5xl", delay: 0, duration: 6 },
  { emoji: "🍎", size: "text-6xl", delay: 1, duration: 7 },
  { emoji: "🍏", size: "text-4xl", delay: 2, duration: 8 },
  { emoji: "🍒", size: "text-3xl", delay: 0.5, duration: 6.5 },
  { emoji: "🥤", size: "text-4xl", delay: 1.5, duration: 7.5 },
  { emoji: "🧃", size: "text-3xl", delay: 2.5, duration: 6 },
];

const FloatingFruit = ({ emoji, size, delay, duration, index }: { 
  emoji: string; 
  size: string; 
  delay: number; 
  duration: number; 
  index: number;
}) => {
  const positions = [
    { top: "10%", left: "5%" },
    { top: "20%", right: "10%" },
    { top: "35%", right: "20%" },
    { top: "60%", left: "8%" },
    { top: "75%", right: "15%" },
    { top: "85%", left: "20%" },
  ];

  const position = positions[index % positions.length];

  return (
    <motion.div
      className={`fixed ${size} pointer-events-none z-20 select-none`}
      style={position}
      animate={{
        y: [-20, 20, -20],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.div>
  );
};

export default function Home() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<EmailFormData>({
    resolver: zodResolver(insertEmailSubscriptionSchema),
    defaultValues: {
      email: "",
    },
  });

  const emailMutation = useMutation({
    mutationFn: async (data: EmailFormData) => {
      const response = await apiRequest("POST", "/api/subscribe", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "¡Perfecto!",
        description: data.message,
      });
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Hubo un problema. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EmailFormData) => {
    emailMutation.mutate(data);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Fruits Background */}
      <div className="fixed inset-0 overflow-hidden z-20 pointer-events-none">
        {floatingFruits.map((fruit, index) => (
          <FloatingFruit
            key={index}
            emoji={fruit.emoji}
            size={fruit.size}
            delay={fruit.delay}
            duration={fruit.duration}
            index={index}
          />
        ))}
      </div>
      {/* Main Content */}
      <div className="relative z-10 sip-gradient min-h-screen">
        {/* Header */}
        <header className="py-12 pt-32">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.div 
                className="relative inline-block"
                animate={{ 
                  rotateY: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-green-300/30 via-yellow-300/20 to-orange-300/25 rounded-3xl blur-2xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                <img 
                  src={sipBiteLogo} 
                  alt="Sip & Bite Logo" 
                  className="relative w-48 md:w-64 lg:w-80 h-auto mx-auto drop-shadow-2xl rounded-3xl bg-gradient-to-br from-white/30 via-green-100/25 to-yellow-100/20 backdrop-blur-sm p-6 border border-white/30 shadow-xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center space-y-8"
          >
            {/* Coming Soon Title */}
            <div className="space-y-4">
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl text-gray-900 drop-shadow-lg font-extrabold"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ¡Sip & Bite ya está aquí!
              </motion.h1>
            </div>

            {/* Description */}
            <div className="max-w-4xl mx-auto space-y-8">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-gray-900 text-xl md:text-3xl lg:text-4xl font-bold leading-relaxed drop-shadow-lg bg-gradient-to-r from-green-600 via-orange-500 to-red-400 bg-clip-text text-transparent"
              >
                Jugos naturales, energía real.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl"
              >
                <p className="text-gray-900 text-lg md:text-2xl font-semibold leading-relaxed">
                  🍹 Las bebidas más frescas y deliciosas
                </p>
                <p className="text-gray-800 text-base md:text-xl leading-relaxed mt-4">
                  Jugos naturales • Bebidas tropicales • Refrescos únicos
                </p>
                <p className="text-gray-700 text-sm md:text-lg leading-relaxed mt-3 italic font-medium">¡La explosión de sabor que tu día necesita! 🎉 En Sip&Bite, creamos experiencias refrescantes con las frutas más frescas. Jugos, diferentes sabores de Té  e infusiones y Agua de Coco para cada antojo. ¿Listo para refrescar tu día?
                 ¡Pide fácil y rápido! 
                👇 www.sipnbite.cr</p>
              </motion.div>
            </div>


          </motion.div>
        </main>

        {/* QR Code Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-lg mx-auto text-center"
            >
              <motion.div
                className="glass-effect rounded-3xl p-6 shadow-2xl hover-lift"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-gray-900 font-bold text-xl md:text-2xl mb-4">
                  <Instagram className="inline mr-2 text-pink-600" />
                  ¡Síguenos!
                </h2>
                <div className="bg-white rounded-xl p-4 mb-4 shadow-inner">
                  <img 
                    src={instagramQR} 
                    alt="Instagram QR Code @sipn_bite.cr" 
                    className="w-full h-auto max-w-48 mx-auto rounded-lg"
                  />
                </div>
                <p className="text-gray-700 text-base font-medium">
                  Escanea para seguir nuestras aventuras
                </p>
                <p className="text-gray-900 font-bold text-lg mt-2">
                  @sipn_bite.cr
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center text-gray-900 font-black text-3xl md:text-4xl mb-12 drop-shadow-lg"
            >
              ¡Mantente en contacto!
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Follow Us */}
              <a
                href="https://instagram.com/sipn_bite.cr"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-effect rounded-2xl p-8 text-center hover-lift relative overflow-hidden cursor-pointer block transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                data-testid="link-instagram"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-pink-600/10 opacity-50 pointer-events-none" aria-hidden="true"></div>
                <div className="relative z-10 pointer-events-none">
                  <div className="text-pink-500 text-5xl mb-4">
                    <Instagram className="mx-auto drop-shadow-lg" />
                  </div>
                  <h3 className="text-gray-900 font-bold text-xl mb-2">Instagram</h3>
                  <p className="text-gray-700 font-semibold">@sipn_bite.cr</p>
                  <p className="text-gray-600 text-sm mt-2">¡Únete a nuestra aventura!</p>
                </div>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@sipn_bite.cr"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-effect rounded-2xl p-8 text-center hover-lift relative overflow-hidden cursor-pointer block transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                data-testid="link-tiktok"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-pink-500/5 to-cyan-600/10 opacity-50 pointer-events-none" aria-hidden="true"></div>
                <div className="relative z-10 pointer-events-none">
                  <div className="text-gray-900 text-5xl mb-4">
                    <SiTiktok className="mx-auto drop-shadow-lg" />
                  </div>
                  <h3 className="text-gray-900 font-bold text-xl mb-2">TikTok</h3>
                  <p className="text-gray-700 font-semibold">sipn_bite.cr</p>
                  <p className="text-gray-600 text-sm mt-2">¡Sigue nuestro contenido!</p>
                </div>
              </a>

              {/* Write to Us */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-8 text-center hover-lift card-pulse relative overflow-hidden"
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/5 to-orange-600/10 opacity-50"></div>
                <div className="relative z-10">
                  <div className="text-sip-orange text-5xl mb-4">
                    <Mail className="mx-auto drop-shadow-lg" />
                  </div>
                  <h3 className="text-gray-900 font-bold text-xl mb-2">Escríbenos</h3>
                  <p className="text-gray-700 font-semibold">info@sipnbite.cr</p>
                  <p className="text-gray-600 text-sm mt-2">¡Estamos aquí para ti!</p>
                </div>
              </motion.div>



              {/* Find Us */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-8 text-center hover-lift card-pulse relative overflow-hidden"
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-pink-500/5 to-red-600/10 opacity-50"></div>
                <div className="relative z-10">
                  <div className="text-sip-red text-5xl mb-4">
                    <MapPin className="mx-auto drop-shadow-lg" />
                  </div>
                  <h3 className="text-gray-900 font-bold text-xl mb-2">Encuéntranos</h3>
                  <p className="text-gray-700 font-semibold">Heredia, Costa Rica</p>
                  <p className="text-gray-600 text-sm mt-2">¡El sabor tropical!</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-gray-700 text-lg">
                © 2025 Sip & Bite - Sabores que refrescan tu día
              </p>
              <div className="flex justify-center space-x-6 text-2xl">
                <motion.a
                  href="https://instagram.com/sipn_bite.cr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook />
                </motion.a>
                <motion.a
                  href="https://wa.me/50687042019"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MessageCircle />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/50689663939"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-[#25d366] text-white p-5 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-110 transition-all duration-300 flex items-center justify-center"
          data-testid="button-whatsapp-float"
          style={{ pointerEvents: 'auto' }}
        >
          <SiWhatsapp className="w-8 h-8" style={{ pointerEvents: 'none' }} />
        </a>
      </div>
    </div>
  );
}
