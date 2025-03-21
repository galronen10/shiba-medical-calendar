import { toast } from '@/utils';
import { LoginFormData } from './formUtils';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes';
import { api } from '@/api';
import { AuthErrorCodes } from 'firebase/auth';

interface IUseHandleLogin {
  handleValidFormData: (formData: LoginFormData) => Promise<void>;
  handleWrongFormData: () => void;
  isButtonLoading: boolean;
}

export const useHandleLogin = (): IUseHandleLogin => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const onLoginSuccess = async (userId: string | null) => {
    if (!userId) {
      toast.error('שגיאה בפרטי ההתחברות נא לנסות שוב');
      return;
    }

    try {
      toast.success('התחברת בהצלחה!');
      setIsButtonLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: EAppRoutes.main }],
      });
    } catch (error: any) {
      toast.error('שגיאה בפרטי ההתחברות נא לנסות שוב');
      setIsButtonLoading(false);
    }
  };

  const handleValidFormData = async (formData: LoginFormData) => {
    setIsButtonLoading(true);

    const { email, password } = formData;
    try {
      const response = await api.auth.login(email, password);
      await onLoginSuccess(response.user.uid);
    } catch (error: any) {
      setIsButtonLoading(false);

      let errorMessage: string;
      switch (error.code) {
        case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
          errorMessage = 'המשתמש אליו ניסית להתחבר לא קיים';
          break;
        case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
          errorMessage = 'המשמתמש ננעל זמנית עקב ניסיות כושלים רבים מידי';
          break;
        default:
          errorMessage = 'שגיאה בפרטי ההתחברות נא לנסות שוב';
          break;
      }
      toast.error(errorMessage);
    }
  };

  const handleWrongFormData = (): void => {
    toast.error('נא למלא פרטים תקינים');
  };

  return {
    isButtonLoading,
    handleWrongFormData,
    handleValidFormData,
  };
};
