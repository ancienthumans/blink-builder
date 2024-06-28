import { z } from "zod";

// Define the ActionParameter schema
const ActionParameterSchema = z.object({
  name: z.string(),
  label: z.string().optional(),
  required: z.boolean().optional(),
});

// Define the LinkedAction schema
const LinkedActionSchema = z.object({
  href: z.string(),
  label: z.string(),
  parameters: z.array(ActionParameterSchema).optional(),
});

// Define the ActionError schema
const ActionErrorSchema = z.object({
  message: z.string(),
});

// Define the ActionGetResponse schema
export const ActionGetResponseSchema = z.object({
  icon: z.string().min(1),
  label: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  links: z
    .object({
      actions: z.array(LinkedActionSchema),
    })
    .optional(),

  error: ActionErrorSchema.optional(),
  disabled: z.boolean().optional(),
});

export type ActionGetResponse = z.infer<typeof ActionGetResponseSchema>;
