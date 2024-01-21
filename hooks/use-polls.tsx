import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 
import { auth } from '@clerk/nextjs';
import { Product } from '@/types';
import { AlertTriangle } from 'lucide-react';

interface PollStore {
  poll: String;
  addPoll: (poll: String) => void;
  getPoll:()=>void


}

const usePoll = create(
  persist<PollStore>((set, get) => ({
  poll: "",
  addPoll: (poll: String) => {
  
   

    set({ poll: poll });
   
  },
  getPoll:()=>{
    get().poll
  }

 

}), {
  name: 'poll-storage',
  storage: createJSONStorage(() => localStorage)
}));

export default usePoll;