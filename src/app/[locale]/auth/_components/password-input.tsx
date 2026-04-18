import { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";

interface PasswordInputProps extends React.ComponentProps<typeof Input> {
  fieldState?: {
    error?: FieldError;
  };
}
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ ...props }, ref) => {
    // State
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        {/* Input */}
        <Input type={showPassword ? "text" : "password"} {...props} ref={ref} />

        {/* Toggle visibility */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 rtl:right-auto rtl:left-0 top-0  h-full px-3 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Eye size={25} color="#949BA5" />
          ) : (
            <EyeClosed size={25} color="#949BA5" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
