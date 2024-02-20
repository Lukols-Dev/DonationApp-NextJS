import Container from "@/components/Container";
import UserBillingForm from "@/components/forms/account/user-billing-form";
import UserDataForm from "@/components/forms/account/user-data-form";
import UserDeleteAccForm from "@/components/forms/account/user-delete-acc-form";
import { Card, CardContent } from "@/components/ui/card";
import getCurrentUser from "@/lib/auth-actions";
import { UserService } from "@/lib/firebase/firebase-actions";

const UserSettingPage = async () => {
  const currentUser: { uid: string } = await getCurrentUser();
  const data = await UserService.getUserData(currentUser.uid);

  return (
    <Container>
      <section className="w-full h-full gap-4 flex flex-col">
        <div className="w-full h-full flex flex-col text-2xl text-[#333B69] font-semibold gap-y-6">
          Ustawienia konta
          {/* card 1 */}
          <Card>
            <CardContent className="flex flex-col gap-y-4">
              <UserDataForm data={data} uid={currentUser.uid} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-y-4">
              <UserBillingForm data={data} uid={currentUser.uid} />
            </CardContent>
          </Card>
          <Card className="max-w-[500px]">
            <CardContent className="flex flex-col gap-y-4">
              <UserDeleteAccForm data={data} uid={currentUser.uid} />
            </CardContent>
          </Card>
        </div>
      </section>
    </Container>
  );
};

export default UserSettingPage;
