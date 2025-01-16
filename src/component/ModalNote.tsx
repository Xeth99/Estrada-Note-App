import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleModal, addNote, setLoading } from "../store/noteSlice";
import { IoIosAdd } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineClear } from "react-icons/md";
import { ScaleLoader } from "react-spinners";

export const NewNoteModal: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.notes.isModalOpen
  );
  const loading = useSelector((state: RootState) => state.notes.loading);

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (!title) {
      setError("Title is required!");
      dispatch(setLoading(false));
      return;
    }
  
    dispatch(setLoading(true)); 
  
    dispatch(
      addNote({
        title,
        date: new Date(),
        body: body,
      })
    );
  
    setTitle("");
    setBody("");
    setTimeout(() => {
      dispatch(setLoading(false));
      dispatch(toggleModal());
    }, 3000);
  };
  

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <ScaleLoader color="#ac4782" />
        </div>
      )}
      <div className="bg-white rounded-lg px-6 py-20 w-[400px] min-h-[500px] relative">
        <div>
          <button
            className="absolute text-[16px] text-sidebarText font-RalewayBold top-4 right-6 hover:text-[#000000] cursor-pointer focus:outline-none focus:text-[#000000]"
            onClick={() => dispatch(toggleModal())}
          >
            <MdOutlineClear size={20} />
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <button
            className="text-[16px] text-sidebarText font-RalewayBold flex items-center gap-2 hover:text-[#000000] cursor-pointer focus:outline-none focus:text-[#000000]"
            onClick={handleSave}
          >
            <div className="rounded-full bg-sidebarText bg-opacity-25">
              <IoIosAdd size={24} />
            </div>
            Save Note
          </button>
          <div className="text-[16px] text-sidebarText font-RalewayBold justify-start">
            <BsThreeDots size={30} className="text-[#B3B3B3]" />
          </div>
        </div>

        {error && <div className="text-error text-sm mb-2">{error}</div>}

        <input
          type="text"
          className="w-full text-[24px] border-none font-RalewayBold text-sidebarText mb-2 focus:outline-none"
          placeholder="Enter Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="border-b-[1px] border-[#0000002B] w-full mb-2"></div>
        <textarea
          className="w-full font-RalewayBold text-[16px] focus:outline-none"
          placeholder="Type notes here..."
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default NewNoteModal;
