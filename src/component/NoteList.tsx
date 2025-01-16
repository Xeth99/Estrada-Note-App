import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Sidebar from "./Sidebar";
import UserImg from "../assets/img/user.jpeg";
import { CgDetailsMore } from "react-icons/cg";
import { FaFile } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { RiStickyNoteAddLine } from "react-icons/ri";
import NewNoteModal from "./ModalNote";
import {
  deleteNote,
  editNote,
  deleteAllNotes,
  toggleModal,
  setLoading,
} from "../store/noteSlice";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";
import { ScaleLoader } from "react-spinners";

const NoteList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const loading = useSelector((state: RootState) => state.notes.loading);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");
  const [filter, setFilter] = useState("Today");
  const [error, setError] = useState<string | null>(null);

  const handleEdit = (note: any) => {
    setSelectedNote(note);
    setEditedTitle(note.title);
    setEditedContent(note.body);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (!editedTitle.trim()) {
      setError("Title is required");
      return;
    }

    dispatch(setLoading(true));

    setTimeout(() => {
      if (selectedNote) {
        dispatch(
          editNote({
            id: selectedNote.id,
            title: editedTitle,
            body: editedContent,
          })
        );
        dispatch(setLoading(false));
        setIsModalOpen(false);
      }
    }, 3000);
  };

  const handleDelete = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      if (selectedNote) {
        dispatch(deleteNote(selectedNote.id));
      }
    }, 3000);

    dispatch(setLoading(false));
    setIsModalOpen(false);
  };

  const handleAllDelete = () => {
    setTimeout(() => {
      dispatch(deleteAllNotes());
      dispatch(setLoading(true));
    }, 3000);
    dispatch(setLoading(false));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
    setEditedTitle("");
    setEditedContent("");
    setError(null);
  };

  const getFilteredNotes = () => {
    const now = new Date();
    const timeThreshold = {
      Today: 24 * 60 * 60 * 1000,
      ThisWeek: 7 * 24 * 60 * 60 * 1000,
      ThisMonth: 31 * 24 * 60 * 60 * 1000,
    };

    return notes.filter((note) => {
      const noteDate = new Date(note.date);
      const timeDifference = now.getTime() - noteDate.getTime();

      if (filter === "Today") {
        return timeDifference <= timeThreshold.Today;
      } else if (filter === "This Week") {
        return timeDifference <= timeThreshold.ThisWeek;
      } else if (filter === "This Month") {
        return timeDifference <= timeThreshold.ThisMonth;
      }

      if (search) {
        const searchQuery = search.toLowerCase();
        return (
          note.title.toLowerCase().includes(searchQuery) ||
          note.body.toLowerCase().includes(searchQuery)
        );
      }

      return true;
    });
  };

  const filteredNotes = React.useMemo(
    () => getFilteredNotes(),
    [notes, filter, search]
  );

  return (
    <div className="flex h-screen w-full flex-col sm:flex-row">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <ScaleLoader color="#ac4782" />
          </div>
        )}

        {/* Main Content Section */}
        <div className="flex-1 p-4 overflow-x-hidden">
          <div className="w-full flex justify-between items-center mt-[3rem] px-2 md:px-10">
            <div className="flex items-center lg:justify-between gap-16">
              <h2 className="text-sidebarText font-RalewayBold lg:text-[32px] text-[20px] text-nowrap">
                My Notes
              </h2>
              <div className="relative">
                <IoSearchOutline
                  size={20}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#868686]"
                />
                <input
                  className="w-full bg-inputBg rounded-[5px] pl-[60px] pr-[20px] py-[10px] text-[#868686] font-RalewayBold text-[16px] focus:outline-none focus:border-none"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="lg:flex items-center gap-[2rem] hidden">
              <div className="flex items-center gap-[1.5rem]">
                <p className="text-sidebarText font-RalewayRegular text-[18px]">
                  Akinremi Adebayo
                </p>
                <img
                  src={UserImg}
                  alt="User"
                  className="rounded-full h-10 w-10 overflow-hidden"
                />
              </div>
              <div>
                <CgDetailsMore
                  size={30}
                  className="-scale-x-100 text-sidebarText"
                />
              </div>
            </div>
          </div>

          {/* Recent Folder Section */}
          <div className="bg-inputBg rounded-lg py-3 w-full mt-6 px-3 md:px-10">
            <p className="mt-4">Recent Folder</p>
            <div className="flex items-center gap-4 mt-4">
              <p className="text-sidebarText text-[16px]">Today</p>
              <p className="text-[#000000]">
                This <span className="underline text-[16px]">Week</span>
              </p>
              <p className="text-sidebarText text-[16px]">This Month</p>
            </div>

            <div className="flex items-center gap-[1.5rem] overflow-x-auto md:overflow-x-hidden">
              {/* Product Review Cards */}
              <div className="flex md:flex-wrap flex-nowrap items-center justify-between gap-[1rem]">
                <div className="bg-review1 rounded-lg px-3 py-3 mt-6 w-[250px] h-[150px] flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <FaFile className="text-[#D5768A]" size={30} />
                    <BsThreeDots />
                  </div>
                  <div className="pt-4">
                    <p className="mt-4 font-RalewayBold text-[20px] text-[#4C4B4B]">
                      Product Review
                    </p>
                    <p className="text-[#7A7A7A] text-[12px]">12/12/2024</p>
                  </div>
                </div>

                <div className="bg-review2 rounded-lg px-3 py-3 mt-6 w-[250px] h-[150px] flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <FaFile className="text-[#A9A2D8]" size={30} />
                    <BsThreeDots />
                  </div>
                  <div className="pt-4">
                    <p className="mt-4 font-RalewayBold text-[20px] text-[#4C4B4B]">
                      Product Review
                    </p>
                    <p className="text-[#7A7A7A] text-[12px]">12/12/2024</p>
                  </div>
                </div>

                <div className="bg-review3 rounded-lg px-3 py-3 mt-6 w-[250px] h-[150px] flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <FaFile className="text-[#B0AC57]" size={30} />
                    <BsThreeDots />
                  </div>
                  <div className="pt-4">
                    <p className="mt-4 font-RalewayBold text-[20px] text-[#4C4B4B]">
                      Product Review
                    </p>
                    <p className="text-[#7A7A7A] text-[12px]">12/12/2024</p>
                  </div>
                </div>

                <div className="bg-[#EBEBEB] border-dashed border-[1px] border-[#000000] border-opacity-25 rounded-[21px] flex flex-col items-center justify-center w-[150px] h-[120px] flex-shrink-0">
                  <FaFile className="text-[#000000]" size={30} />
                  <p className="mt-4 font-RalewayBold text-[20px] text-[#4C4B4B]">
                    Add Folder
                  </p>
                </div>
              </div>
            </div>

            {/* My Notes */}
            <div className="mt-10">
              <div className="flex justify-between">
                <h2 className="text-sidebarText font-RalewayBold text-[24px]">
                  My Notes
                </h2>
                <button
                  className="border rounded-full py-2 px-3 flex items-center text-sidebarText font-RalewayRegular text-[16px] sm:text-[10px] cursor-pointer hover:text-[#000000] focus:text-[#000000]"
                  onClick={handleAllDelete}
                >
                  <MdOutlineClear size={20} className="mr-0.5" />{" "}
                  <p>Clear Notes</p>
                </button>
              </div>
              <div className="flex items-center gap-4 mt-4">
                {["Today", "This Week", "This Month"].map((item) => (
                  <p
                    key={item}
                    className={`cursor-pointer ${
                      filter === item
                        ? "underline font-RalewayBold"
                        : "text-sidebarText"
                    }`}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </p>
                ))}
              </div>

              {/* Notes */}
              <div className="mt-6 flex flex-wrap gap-6 items-center">
                <div className="flex gap-4 items-center overflow-x-auto scrollbar-hidden">
                  {filteredNotes.map((note, index) => (
                    <div
                      key={index}
                      className="border-[2px] hover:border-[#FFE2E8] bg-[#EBEBEB] rounded-[21px] w-[250px] h-[300px] flex-shrink-0"
                    >
                      <div className="flex items-center justify-between w-full px-4 py-2 border-b-[1px] border-[#0000002B]">
                        <div className="flex flex-col w-full">
                          <div className="flex justify-between items-center">
                            <p className="text-[#4C4B4B] font-RalewayBold text-[16px]">
                              {note.title}
                            </p>
                            <BsThreeDots
                              className="text-[#4C4B4B] cursor-pointer"
                              onClick={() => handleEdit(note)}
                            />
                          </div>
                          <p className="text-[#7A7A7A] text-[12px]">
                            {note.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-[#171717] font-RalewayRegular text-[12px] p-4 text-justify mb-10">
                        {note.body}
                      </p>
                    </div>
                  ))}

                  {/* New Note Card */}
                  <div
                    onClick={() => dispatch(toggleModal())}
                    className="cursor-pointer bg-[#EBEBEB] border-dashed border-[1px] border-[#000000] border-opacity-25 rounded-[21px] flex flex-col items-center justify-center w-[150px] h-[120px] flex-shrink-0"
                  >
                    <RiStickyNoteAddLine className="text-[#000000]" size={30} />
                    <p className="mt-4 font-RalewayBold text-[20px] text-[#4C4B4B]">
                      New Note
                    </p>
                  </div>
                </div>

                {/* Add note Modal */}
                <NewNoteModal />

                {/* Edit and Delete Note */}
                {isModalOpen && selectedNote && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    {loading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                        <ScaleLoader color="#ac4782" />
                      </div>
                    )}
                    <div className="bg-white rounded-lg px-6 py-6 w-[400px] min-h-[300px] relative">
                      <button
                        className="absolute top-4 right-6 text-[16px] text-sidebarText font-RalewayBold hover:text-[#000000] cursor-pointer focus:outline-none focus:text-[#000000]"
                        onClick={handleCloseModal}
                      >
                        <MdOutlineClear size={20} />
                      </button>
                      <div className="mt-4">
                        {error && (
                          <div className="text-error text-sm mb-2">{error}</div>
                        )}
                        <input
                          type="text"
                          className="w-full text-[24px] border-none font-RalewayBold text-sidebarText mb-2 focus:outline-none"
                          value={editedTitle}
                          onChange={(e) => {
                            setEditedTitle(e.target.value);
                            if (e.target.value) {
                              setError(null);
                            }
                          }}
                        />
                        <div className="border-b-[1px] border-[#0000002B] w-full mb-2"></div>
                        <textarea
                          className="w-full font-RalewayBold text-[16px] focus:outline-none"
                          rows={5}
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="flex justify-between mt-4">
                        <button
                          className="text-success font-RalewayBold px-4 py-2 rounded bg-inputBg hover:bg-sidebarText hover:bg-opacity-25"
                          onClick={handleUpdate}
                        >
                          Save Changes
                        </button>
                        <button
                          className="text-sidebarText font-RalewayBold px-4 py-2 rounded bg-inputBg hover:text-error hover:bg-sidebarText hover:bg-opacity-25"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteList;
