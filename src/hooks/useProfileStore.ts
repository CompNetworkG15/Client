import { API } from "@/config";
import client from "@/utils/client";
import { create } from "zustand";
import FormData from "form-data";

type ProfileStore = {
  nickname?: string;
  email?: string;
  id?: number;
  imageUrl?: string;
  login: (email: string) => Promise<void>;
  signup: (email: string, nickname: string) => Promise<void>;
  editNickName: (nickname: string, id: number) => Promise<void>;
  uploadImage: (image: FormData, id: number) => Promise<void>;
};

const useProfileStore = create<ProfileStore>((set, get) => ({
  login: async (email: string) => {
    const { data } = await client.post(`${API}client/login`, { email });
    set({
      email: data.email,
      id: data.id,
      nickname: data.nickname,
      imageUrl: data.image,
    });
    console.log(data);
  },
  signup: async (email: string, nickname: string) => {
    const { data } = await client.post(`${API}client`, {
      email,
      nickname,
    });
    set({ email: data.email, id: data.id, nickname: data.nickname });
  },
  editNickName: async (nickname: string, id: number) => {
    const { data } = await client.patch(`${API}client/${id}`, { nickname });
    set({ nickname: data.nickname });
  },
  uploadImage: async (image: FormData, id: number) => {
    const { data } = await client.patch(
      `${API}client/${id}`,
      { image },
      {
        "Content-Type": "multipart/form-data",
      }
    );
    set({ imageUrl: data.image });
  },
}));

export default useProfileStore;
