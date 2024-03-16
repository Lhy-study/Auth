import CardWrapper from "./CardWrapper";

const LoginForm = () => {
  return (
    <CardWrapper 
     headerLabel="欢迎回来!" 
     backButtonLabel='还没有账号？前往注册吧!' 
     backButtonHref='/auth/register' 
     showSocial    
    >
      LoginForm
    </CardWrapper>
  )
}
export default LoginForm