import {
  MdAdd,
  MdArrowBack,
  MdLogin,
  MdPerson,
  MdRemove,
} from "react-icons/md";
import {
  IconButton,
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from "../../components/common/Buttons";
import { AppBarTitle, TextTitle } from "../../components/common/Texts";
import { OrDivider } from "../../components/common/Divider";
import { AppIcon, AppLogo } from "../../components/common/Logo";
import { ListTile } from "../../components/common/ListTile";

export default function ComponentsPage() {
  return (
    <div className=" w-full p-4 flex flex-col gap-2 items-center">
      <div className="w-full max-w-xs">
        <TextTitle text="Buttons" />
      </div>
      <PrimaryButton text="Entrar" />
      <SecondaryButton text="Cadastrar" />

      <TextButton text="Sala 1234" children={<MdLogin className="h-4 w-4" />} />
      <div className="flex flex-row gap-2">
        <IconButton
          className="text-red-600 "
          hideBorder={true}
          children={<MdArrowBack />}
        />
        <IconButton children={<MdAdd />} />
        <IconButton children={<MdRemove />} />
      </div>

      <OrDivider />

      <AppIcon />
      <AppLogo />
      <AppBarTitle text="Sala 1234" />

      <div className="w-full max-w-md">
        <TextTitle text="Jogadores" />
      </div>
      <ListTile
        title={"pedrofaleiros"}
        trailing="ADM"
        borderColor="border-blue-500"
        textColor="text-blue-300"
      />

      <ListTile title={"danijorge"} />

      <div className="w-full max-w-md">
        <TextTitle text="Resultado" />
      </div>

      <ListTile
        title={"pedrofaleiros"}
        trailing={<AppIcon />}
        borderColor="border-red-600"
        textColor="text-red-400"
      />

      <ListTile
        title={"danijorge"}
        trailing={"Piloto"}
        borderColor="border-blue-200"
        textColor="text-blue-200"
      />
    </div>
  );
}
