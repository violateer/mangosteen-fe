import { PropType, defineComponent, reactive, ref } from "vue";
import s from "./SignInPage.module.scss";
import { MainLayout } from "../layouts/MainLayout";
import { Icon } from "../shared/Icon";
import { Form, FormItem } from "../shared/Form";
import { Button } from "../shared/Button";
import { Rules, hasError, resetErrors, validate } from "../shared/validate";
import { http } from "../shared/Http";
import { useBool } from "../hooks/useBool";
import { useRoute, useRouter } from "vue-router";
import { refreshMe } from "../shared/me";

export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup(props, context) {
    const formData = reactive({
      email: "",
      code: "",
    });
    const errors = reactive({
      email: [],
      code: [],
    });
    const refValidationCode = ref<any>();
    const { ref: refDisabled, toggle, on, off } = useBool(false);
    const router = useRouter();
    const route = useRoute();

    const onSubmit = async (e: Event) => {
      const rules: Rules<typeof formData> = [
        {
          key: "email",
          type: "required",
          message: "必填",
        },
        {
          key: "email",
          type: "pattern",
          regex: /.+@.+/,
          message: "必须是邮箱地址",
        },
        { key: "code", type: "required", message: "必填" },
      ];

      resetErrors(errors);
      Object.assign(errors, validate(formData, rules));

      if (!hasError(errors)) {
        const res = await http.post<{ jwt: string }>("/session", formData);
        localStorage.setItem("jwt", res.data.jwt);
        // router.push("/sign_in?return_to="+encodeURIComponent(route.fullPath))
        const returnTo = route.query.return_to?.toString();
        refreshMe();
        router.push(returnTo || "/");
      }
    };

    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
        throw error; // 如果不throw，await就会判断为请求成功
      }
    };

    const onClickSendValidationCode = async () => {
      on();
      const res = await http
        .post("/validation_codes", {
          email: formData.email,
        })
        .catch((error) => onError(error))
        .finally(off);

      refValidationCode.value.startCount();
    };

    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <Icon name="left" />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="mangosteen"></Icon>
                <h1 class={s.appName}>山竹记账</h1>
              </div>
              <Form>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  v-model={formData.email}
                  error={errors.email?.[0]}
                  placeholder="请输入邮箱，然后点击发送验证码"
                />
                <FormItem
                  ref={refValidationCode}
                  label="验证码"
                  type="validationcode"
                  v-model={formData.code}
                  error={errors.code?.[0]}
                  placeholder="请输入六位数字"
                  disabled={refDisabled.value}
                  onClick={onClickSendValidationCode}
                />
                <FormItem class={s.signInBtn}>
                  <Button type="submit" onClick={onSubmit}>
                    登录
                  </Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
