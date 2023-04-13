import { API } from "@/config";
import client from "@/utils/client";
import { create } from "zustand";

type ProfileStore = {
  nickname?: string;
  email?: string;
  id?: number;
  login: (email: string) => Promise<void>;
  signup: (email: string, nickname: string) => Promise<void>;
  editNickName: (nickname: string, id: number) => Promise<void>;
};

const useProfileStore = create<ProfileStore>((set, get) => ({
  login: async (email: string) => {
    const { data } = await client.post(`${API}client/login`, { email });
    set({ email: data.email, id: data.id, nickname: data.nickname });
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
}));

export default useProfileStore;
