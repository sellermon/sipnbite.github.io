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
      className={`fixed ${size} pointer-events-none z-0 select-none`}
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
      <div className="fixed inset-0 overflow-hidden">
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
        <header className="py-6">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="animate-bounce"
            >
              <img 
                src={sipBiteLogo} 
                alt="Sip & Bite Logo" 
                className="w-48 md:w-64 lg:w-80 h-auto mx-auto drop-shadow-2xl ml-[336px] mr-[336px] pl-[0px] pr-[0px] mt-[102px] mb-[102px]"
              />
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
                className="text-4xl md:text-6xl lg:text-7xl text-white drop-shadow-lg mt-[0px] mb-[0px] ml-[9px] mr-[9px] pl-[137px] pr-[137px] pt-[-16px] pb-[-16px] font-extrabold"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ¡PRÓXIMAMENTE!
              </motion.h1>
              <motion.div
                className="bg-sip-orange text-white px-8 py-4 rounded-full inline-block font-bold text-xl md:text-2xl shadow-2xl hover-lift"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                2025
              </motion.div>
            </div>

            {/* Description */}
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-white text-xl md:text-2xl font-semibold leading-relaxed drop-shadow-md">
                Prepárate para disfrutar de las bebidas más frescas y deliciosas
              </p>
              <p className="text-green-100 text-lg md:text-xl leading-relaxed">Jugos naturales, bebidas tropicales y mucho más te esperan en nuestra nueva aventura de sabores</p>
            </div>

            {/* Email Signup */}
            <div className="max-w-md mx-auto">
              <motion.div
                className="glass-effect rounded-2xl p-6 shadow-2xl hover-lift"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-white font-bold text-xl mb-4">
                  <Bell className="inline mr-2 text-sip-orange" />
                  ¡Sé el primero en saberlo!
                </h3>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-white text-center py-4"
                  >
                    <div className="text-green-300 text-4xl mb-2">✓</div>
                    <p className="font-semibold">¡Listo! Te contactaremos pronto.</p>
                  </motion.div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="tu@email.com"
                                className="w-full px-4 py-3 rounded-xl border-0 bg-white/90 text-gray-800 placeholder-gray-500 focus:ring-4 focus:ring-sip-orange/50 transition-all"
                              />
                            </FormControl>
                            <FormMessage className="text-red-200" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        disabled={emailMutation.isPending}
                        className="w-full bg-sip-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        {emailMutation.isPending ? (
                          "Enviando..."
                        ) : (
                          <>
                            <Mail className="mr-2 h-4 w-4" />
                            ¡Notificarme!
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
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
                className="glass-effect rounded-3xl p-8 shadow-2xl hover-lift"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-white font-bold text-2xl md:text-3xl mb-6">
                  <Instagram className="inline mr-3 text-pink-400" />
                  ¡Síguenos!
                </h2>
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-inner">
                  <img 
                    src={instagramQR} 
                    alt="Instagram QR Code @sipn_bite.cr" 
                    className="w-full h-auto max-w-xs mx-auto rounded-lg"
                  />
                </div>
                <p className="text-green-100 text-lg font-medium">
                  Escanea para seguir nuestras aventuras
                </p>
                <p className="text-white font-bold text-xl mt-2">
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
              className="text-center text-white font-black text-3xl md:text-4xl mb-12 drop-shadow-lg"
            >
              ¡Mantente en contacto!
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Follow Us */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-6 text-center hover-lift"
                whileHover={{ y: -5 }}
              >
                <div className="text-pink-400 text-4xl mb-4">
                  <Instagram className="mx-auto" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Síguenos</h3>
                <p className="text-green-100">@sipn_bite.cr</p>
              </motion.div>

              {/* Write to Us */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-6 text-center hover-lift"
                whileHover={{ y: -5 }}
              >
                <div className="text-sip-orange text-4xl mb-4">
                  <Mail className="mx-auto" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Escríbenos</h3>
                <p className="text-green-100">info@sipnbite.cr</p>
              </motion.div>

              {/* Call Us */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-6 text-center hover-lift"
                whileHover={{ y: -5 }}
              >
                <div className="text-green-300 text-4xl mb-4">
                  <Phone className="mx-auto" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Llámanos</h3>
                <p className="text-green-100">+506 8704-2019</p>
              </motion.div>

              {/* Find Us */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-6 text-center hover-lift"
                whileHover={{ y: -5 }}
              >
                <div className="text-sip-red text-4xl mb-4">
                  <MapPin className="mx-auto" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Encuéntranos</h3>
                <p className="text-green-100">Heredia, Costa Rica</p>
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
              <p className="text-white/80 text-lg">
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
      </div>
    </div>
  );
}
