
import LoginForm from "./_components/login-form";

export default function page() {
  return (
    <div className="text-center">
      <h3 className="text-navy font-bold text-2xl ">مرحبا بعودتك!</h3>
      <p className="mb-5">
        سجل الدخول لاستضافة الالعاب, ادارتها و تتبع نتائجها.
      </p>
      <LoginForm />
    </div>
  );
}
