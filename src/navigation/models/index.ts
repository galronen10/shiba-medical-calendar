import { EAppRoutes } from '@/models/routes.model';

export const titleDisplayText: Record<EAppRoutes, string> = {
  [EAppRoutes.home]: 'ברוכים הבאים',
  [EAppRoutes.reportForm]: '',
  [EAppRoutes.login]: 'התחברות',
  [EAppRoutes.splash]: '',
  [EAppRoutes.selectField]: 'בחר תחום רפואה',
  [EAppRoutes.schedulerForm]: '',
  [EAppRoutes.selectDoctor]: 'בחר רופא',
  [EAppRoutes.selectTime]: 'בחר מועד',
};
