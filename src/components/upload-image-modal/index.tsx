import React, { useEffect, useState } from "react";
import CenteredModal from "@/common/modal";
import useProfileStore from "@/hooks/useProfileStore";
import FormData from "form-data";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Upload, Image, FormInstance, UploadFile, Form } from "antd";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import theme from "@/utils/theme";
import { Typography } from "antd";

const { Paragraph } = Typography;

type PictureFormProps = {};

type UploadImageModalProps = {
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  clientId: number;
};

const PictureForm: React.FC<PictureFormProps> = ({}) => {
  const [url, setUrl] = useState<string>("");

  const ShowImage = () => {
    return url !== "" ? (
      <Image
        src={url}
        alt="an image"
        width="100%"
        style={{ maxHeight: "45vh", objectFit: "contain" }}
        preview={false}
      />
    ) : (
      <>
        <InsertPhotoIcon style={{ fontSize: "3em" }} />
        <Paragraph>Upload profile picture</Paragraph>
      </>
    );
  };

  const form = Form.useFormInstance();

  useEffect(() => {
    const formPicture = form.getFieldValue("picture");
    if (formPicture) {
      setUrl(formPicture.file.thumbUrl);
    }
  }, [form]);

  return (
    <StyledForm
      name="picture"
      rules={[{ required: true, message: "Please insert picture" }]}
    >
      <Upload.Dragger
        maxCount={1}
        beforeUpload={(file: File) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUrl(reader.result as string);
          };
          reader.readAsDataURL(file);
          // return false;
        }}
        onChange={({ file }) => {
          if (file.status === "done") {
            file.thumbUrl = url;
          }
        }}
        onRemove={() => {
          form.setFieldValue("picture", undefined);
          setUrl("");
        }}
      >
        <ShowImage />
      </Upload.Dragger>
    </StyledForm>
  );
};

const UploadImageModal: React.FC<UploadImageModalProps> = ({
  isModalOpen,
  setModalOpen,
  clientId,
}) => {
  const { email, uploadImage } = useProfileStore();
  const [form] = Form.useForm();

  const router = useRouter();

  const onFinish = async () => {
    const formData: FormData = new FormData();
    const { picture } = form.getFieldsValue(true);
    formData.append("email", email);
    formData.append("image", picture.file.originFileObj);
    await uploadImage(formData, clientId);
    setModalOpen(false);
    // router.reload();
  };

  return (
    <CenteredModal
      open={isModalOpen}
      onOk={() => onFinish()}
      okText="Save"
      onCancel={() => {
        setModalOpen(false);
        form.setFieldValue("picture", undefined);
      }}
      bodyStyle={{ marginTop: "6vh", display: "flex", alignItems: "center" }}
    >
      <MyForm form={form}>
        <PictureForm />
      </MyForm>
    </CenteredModal>
  );
};

export default UploadImageModal;

const StyledForm = styled(Form.Item)`
  height: 100%;

  ${theme.media.mobile} {
    width: 100%;
  }
`;
const MyForm = styled(Form)`
  width: 100%;
`;
