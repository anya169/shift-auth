import { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import { IMaskMixin } from 'react-imask';
import { Input } from './ui/Input';

interface CodeInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
    mask?: string;
}

const MaskedInput = IMaskMixin(({ inputRef, placeholder, ...props }: any) => (
    <Input {...props} placeholder={placeholder} ref={inputRef} />
));

export const CodeInput = forwardRef<HTMLInputElement, CodeInputProps>(
    ({ 
        mask = "000000",           
        placeholder = "Проверочный код", 
        ...props 
    }, ref) => {
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

CodeInput.displayName = 'CodeInput';