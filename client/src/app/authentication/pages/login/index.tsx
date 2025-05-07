import { Container } from "@mui/material";
import i18next from "i18next";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../../shared/components/Inputs/FormInput";
import useUserStore from "../../../../store/user.store";
import AuthForm from "../../components/AuthForm";
import useLoginService from "./services/login.service";
import useLoginFormData, {
  LoginFormData,
} from "./validations/login.validation";

export default function Login() {
  // FORM_VALIDATION
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useLoginFormData();

  // HANDLE_LOGIN
  const { mutate, isPending } = useLoginService(setError);
  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  // IF_LOGGED_IN_REDIRECT_TO_HOME
  const token = useUserStore((s) => s.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) return navigate("/");
  }, [token, navigate]);

  return (
    <main className="flex h-lvh flex-col items-center justify-center">
      <Container component={"section"} maxWidth="xs">
        <AuthForm
          isLoading={isPending}
          formHead={i18next.t("signIn", { ns: ["labels"] })}
          handleSubmit={handleSubmit(onSubmit)}
        >
          {/* _________ EMAIL _________ */}
          <FormInput
            inputProps={{
              ...register("email"),
            }}
            helperText={errors.email?.message}
            error={!!errors.email}
            fullWidth
            type="email"
            id="email"
            autoComplete="email"
            autoFocus
            placeholder={i18next.t("email", { ns: ["labels"] })}
            labelKey={i18next.t("email", { ns: ["labels"] })}
            required
          />

          {/* _________ PASSWORD _________ */}
          <FormInput
            inputProps={{
              ...register("password"),
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            type="password"
            id="password"
            labelKey={i18next.t("password", { ns: ["labels"] })}
            placeholder={i18next.t("password", { ns: ["labels"] })}
            required
          />
        </AuthForm>
      </Container>
    </main>
  );
}
