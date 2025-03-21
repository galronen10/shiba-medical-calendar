import { EAppRoutes } from '@/models/routes';

export const titleDisplayText: Record<EAppRoutes, string> = {
  [EAppRoutes.home]: 'בית',
  [EAppRoutes.reportForm]: '',
  [EAppRoutes.login]: 'התחברות',
  [EAppRoutes.splash]: '',
  [EAppRoutes.selectField]: 'בחר תחום רפואה',
  [EAppRoutes.schedulerForm]: '',
  [EAppRoutes.selectDoctor]: 'בחר רופא',
  [EAppRoutes.selectTime]: 'בחר מועד',
};
