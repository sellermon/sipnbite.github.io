import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Email subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getEmailSubscription(validatedData.email);
      if (existingSubscription) {
        return res.status(400).json({ 
          message: "Este email ya está suscrito a nuestras notificaciones" 
        });
      }

      const subscription = await storage.createEmailSubscription(validatedData);
      res.json({ 
        message: "¡Gracias! Te notificaremos cuando lancemos en 2025",
        subscription: { email: subscription.email, subscribedAt: subscription.subscribedAt }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Por favor ingresa un email válido" 
        });
      }
      res.status(500).json({ 
        message: "Error interno del servidor" 
      });
    }
  });

  // Get all subscriptions (for admin purposes)
  app.get("/api/subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getAllEmailSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ 
        message: "Error interno del servidor" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
