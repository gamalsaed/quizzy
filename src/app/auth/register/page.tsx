import RegisterForm from "./_components/register-form";

export default async function page() {

  return (
    <div className="text-center">
      <h3 className="text-navy font-bold text-2xl "> انشاء حساب جديد</h3>
      <p className="mb-5">انضم الي كويزي و ابداء بانشاء العاب رائعة.</p>
      <RegisterForm />
    </div>
  );
}
