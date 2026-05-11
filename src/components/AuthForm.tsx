import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PhoneInput } from './PhoneInput';
import { CodeInput } from './CodeInput';
import { Button } from './ui/Button';
import { useSendOtp, useSignIn } from '../hooks/useAuth';
import { useAuthStore } from '../stores/authStore';

const PHONE_FORMAT = {
    DISPLAY_START: 1,
    DISPLAY_END: 19,
    MIN_LENGTH: 16,
} as const;

const formatPhoneForDisplay = (phone: string): string => {
    if (!phone) return '';
        return phone.slice(PHONE_FORMAT.DISPLAY_START, PHONE_FORMAT.DISPLAY_END);
};

interface PhoneFormData {
    phone: string;
}

interface CodeFormData {
    code: string;
}

export const AuthForm = () => {
    const [step, setStep] = useState<'phone' | 'code'>('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const retryDelay = useAuthStore(state => state.retryDelay);
    const resetDelay = useAuthStore(state => state.resetDelay);
    const [timeLeft, setTimeLeft] = useState<number>(0);

    const { 
        register: registerPhone, 
        handleSubmit: handlePhoneSubmit, 
        formState: { errors: phoneErrors },
    } = useForm<PhoneFormData>();

    const { 
        register: registerCode, 
        handleSubmit: handleCodeSubmit, 
        formState: { errors: codeErrors },
        watch, 
        clearErrors,
        setValue: setCodeValue 
    } = useForm<CodeFormData>();

    const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp();
    const { mutate: signIn, isPending: isSigningIn, error: signInError, reset: resetSignInError } = useSignIn();
   
    const codeValue = watch('code');

    // Очищаем ошибку при изменении кода
    useEffect(() => {
        if (codeValue && codeValue.toString().length > 0) {
            resetSignInError?.();  
            clearErrors('code');   
        }
    }, [codeValue, resetSignInError, clearErrors]);

    const onPhoneSubmit = (data: PhoneFormData) => {
        const phone = data.phone.replace(/\D/g, '');
        setPhoneNumber(phone);
        
        sendOtp({ phone }, {
            onSuccess: () => {
                setStep('code');
            },
        });
    };

    const onCodeSubmit = (data: CodeFormData) => {
        signIn({ phone: phoneNumber, code: Number(data.code) });
    };

    // Таймер
    useEffect(() => {
        if (retryDelay && retryDelay > 0) {
            setTimeLeft(Math.ceil(retryDelay / 1000));
            
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        resetDelay(); 
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            
            return () => clearInterval(timer);
        }
    }, [retryDelay, resetDelay]);

     // Повторная отправка кода
    const handleResendCode = () => {
        if (timeLeft === 0 && phoneNumber) {
            setCodeValue('code', '');
            clearErrors('code');
            resetSignInError?.();
            
            sendOtp({ phone: phoneNumber });
        }
    };

    return (
        <div className="w-[464px] p-8">
            <h2 className="text-2xl font-bold mb-6">Вход</h2>

            <form onSubmit={step === 'phone' ? handlePhoneSubmit(onPhoneSubmit) : handleCodeSubmit(onCodeSubmit)} className="space-y-6">
                {step === 'phone' ? (
                    <>
                        <h3 className="text-base mb-6">Введите номер телефона для входа в личный кабинет</h3>
                        <PhoneInput 
                            error={phoneErrors.phone?.message}
                            inputMode="tel"
                            {...registerPhone('phone', {
                                required: 'Поле является обязательным',
                                minLength: {
                                    value: PHONE_FORMAT.MIN_LENGTH, 
                                    message: 'Введите полный номер телефона',
                                },
                            })}
                        />
                        
                        <Button 
                            type="submit" 
                            disabled={isSendingOtp}
                            className="w-[328px]"
                        >
                            Продолжить
                        </Button>
                    </>
                ) : (
                    <>
                        <h3 className="text-base mb-6">Введите проверочный код для входа в личный кабинет</h3>
                        <PhoneInput 
                            value={phoneNumber ? formatPhoneForDisplay(phoneNumber) : ''}
                            disabled={true}
                            error={phoneErrors.phone?.message}
                        />
               
                        <CodeInput
                            placeholder="Проверочный код"
                            error={codeErrors.code?.message || signInError?.message}
                            inputMode="numeric"                    
                            {...registerCode('code', {
                                required: 'Код должен содержать 6 цифр',
                                minLength: {
                                    value: 6,
                                    message: 'Код должен содержать 6 цифр',
                                },
                                maxLength: {
                                    value: 6,
                                    message: 'Код должен содержать 6 цифр',
                                },
                            })}
                        />

                        <div className="space-y-3">
                            <Button 
                                type="submit" 
                                disabled={isSigningIn}
                                className="w-[328px]"
                            >
                                Войти
                            </Button>
                            
                        </div>

                        <div>
                            {timeLeft > 0 ? (
                                <p className="text-sm text-border-gray">
                                    Запросить код повторно можно через {timeLeft} секунд
                                </p>
                            ) : (
                                <Button 
                                    type="button"
                                    variant="secondary"
                                    onClick={handleResendCode}
                                    disabled={isSendingOtp}
                                    className="w-[328px]"
                                >
                                    Запросить код еще раз
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};