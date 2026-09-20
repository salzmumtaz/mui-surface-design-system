import { z } from 'zod';

const tenantIds = ['prism', 'northstar'] as const;
const themeFamilies = ['light', 'dark'] as const;

export const tenantConfigSchema = z.object({
  tenantId: z.string().min(1),
  displayName: z.string().min(1),
  themePreset: z.enum(tenantIds),
  brandingVersion: z.string().min(1),
  defaultMode: z.enum(themeFamilies),
  branding: z
    .object({
      logoSize: z.enum(['default', 'small', 'x-small']).default('default'),
      density: z.enum(['comfortable', 'compact']).default('comfortable'),
    })
    .default({ logoSize: 'default', density: 'comfortable' }),
  features: z
    .object({
      analytics: z.boolean().default(false),
      teamWorkspace: z.boolean().default(false),
      selfService: z.boolean().default(false),
    })
    .default({ analytics: false, teamWorkspace: false, selfService: false }),
});

export type TenantConfig = z.infer<typeof tenantConfigSchema>;

export function parseTenantConfig(payload: unknown): TenantConfig {
  const result = tenantConfigSchema.safeParse(payload);
  if (!result.success) {
    console.error('Invalid tenant configuration', result.error.flatten());
    throw new Error('Tenant configuration failed validation.');
  }
  return result.data;
}
