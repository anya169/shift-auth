import { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import { IMaskMixin } from 'react-imask';
import { Input } from './ui/Input';

interface PhoneInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
    mask?: string;
}

const MaskedInput = IMaskMixin(({ inputRef, placeholder, ...props }: any) => (
    <Input {...props} placeholder={placeholder} ref={inputRef} />
));

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ 
        mask = "+7 000 000 00 00",  
        placeholder = "Телефон", 
        ...props 
    }, ref) => {
        // Принудительно устанавливаем плейсхолдер, обходя поведение маски
        const inputRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (inputRef.current) {
                inputRef.current.placeholder = placeholder;
            }
        }, [placeholder]);

        useImperativeHandle(ref, () => inputRef.current!);

        return (
            <MaskedInput
                mask={mask}
                unmask={true}
                inputRef={inputRef}
                {...props}
            />
        );
    }
);