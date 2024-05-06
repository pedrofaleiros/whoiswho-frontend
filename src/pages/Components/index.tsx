import { MdAdd, MdArrowBack, MdLogin, MdRemove } from "react-icons/md";
import {
  IconButton,
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from "../../components/common/Buttons";
import { TextTitle } from "../../components/common/Texts";

export default function ComponentsPage() {
  return (
    <div className=" w-full p-4 flex flex-col gap-2 items-center">
      <TextTitle text="Buttons" />
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

      <TextTitle text="Titulo" />
    </div>
  );
}
