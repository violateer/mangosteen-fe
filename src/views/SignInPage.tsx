import { PropType, defineComponent, reactive, ref } from "vue";
import s from "./SignInPage.module.scss";
import { MainLayout } from "../layouts/MainLayout";
import { Icon } from "../shared/Icon";
import { Form, FormItem } from "../shared/Form";
import { Button } from "../shared/Button";
import { Rules, resetErrors, validate } from "../shared/validate";
import axios from "axios";
import { http } from "../shared/Http";

export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup(props, context) {
    const formData = reactive({
      email: "1828257089@qq.com",
      code: "",
    });
    const errors = reactive({
      email: [],
      code: [],
    });
    const refValidationCode = ref<any>();

    const onSubmit = (e: Event) => {
      e.preventDefault();

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
    };

    const onClickSendValidationCode = async () => {
      const res = await http
        .post("/api/v1/validation_codes", {
          email: formData.email,
        })
        .catch((e) => {
          // 失败
        });

      // 成功
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
              <Form onSubmit={onSubmit}>
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
                  onClick={onClickSendValidationCode}
                />
                <FormItem class={s.signInBtn}>
                  <Button>登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
