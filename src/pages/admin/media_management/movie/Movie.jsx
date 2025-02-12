import React, { useContext, useState } from 'react';
import Navboard from '../../../../components/Navboard';
import ModalMovie from "./ModalMovie";
import ModalAdd from "./ModalAdd";
import { ContextCategories } from '../../../../context/CategoriesProvider';
import { ContextCharacters } from '../../../../context/CharacterProvider';
import { ContextActors } from '../../../../context/ActorsProvider';
const inner = {
  name: "",
  description: "",
  duration: "",
  authorID: "",
  planID: "",
  listCate: [],
  listActor: [],
  listCharacter: [],
  rentalPrice: 0,
  likesCount: 0,
  viewsCount: 0,
  date: new Date(),
  imgUrl: ""
};
function Movie(props) {
  const categories = useContext(ContextCategories);

  const characters = useContext(ContextCharacters);
 const actors = useContext(ContextActors);
  const [movie, setMovie] = useState(inner);
  const [errors, setErrors] = useState(inner);
  const [open, setOpen] = useState(false); // dong mo modal
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const [page, setPage] = useState(0); // Lưu trang hiện tại
  const [openDelete, setOpenDelete] = useState(false);
  const [openadd, setOpenAdd] = useState(false);
  const handleOpenadd = () => setOpenAdd(true);
  const handleCloseadd = () => setOpenAdd(false);
  const [dataChoose, setDataChoose] = useState([]);
  const [typeChoose, setTypeChoose] = useState("");
  // 
  const handleSelect = (item, type) => {
    setMovie(prevData => {
      let updatedList;
      switch (type) {
        case "categories":
          updatedList = toggleSelection(prevData.listCate, item);
          return { ...prevData, listCate: updatedList };
        case "actors":
            updatedList = toggleSelection(prevData.listActor, item);
            return { ...prevData, listActor: updatedList };
        case "characters":
          updatedList = toggleSelection(prevData.listCharacter, item);
          return { ...prevData, listCharacter: updatedList };
        default:
          return prevData;
      }
    });
  };
  //
  const toggleSelection = (list, item) => {
    return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
  };
  //
  const getSelectedItems = () => {
    switch (typeChoose) {
        case "categories":
            return movie.listCate;
        case "actors":
            return movie.listActor;
        case "characters":
            return movie.listCharacter;
        default:
            return [];
    }
};
  // mo modaldelete
  const handleOpenDelete = (value) => {
    setOpenDelete(true);
    setMovie(value);

  };
  const onCloseDelete = () => {
    setOpenDelete(false);
  }
  // mở modal thêm
  const handleOpen = () => {
    setOpen(true);
    setMovie(inner);
    setErrors(inner);
  };
  // đóng modal thêm
  const handleClose = () => setOpen(false);
  const handleChange = (value) => {
    setOpen(true);
    setMovie(value);
    setErrors(inner);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Cập nhật từ khóa tìm kiếm
    setPage(0);
  };
console.log(actors);

  const handleChoose = (type) => {
    setTypeChoose(type);
    switch (type) {
      case "categories":
        setDataChoose(categories);
        break;
      case "actors":
         setDataChoose(actors);
       break;
      case "characters":
        setDataChoose(characters);
        break;
      default:
        setDataChoose([]);
    }
    setOpenAdd(true);
  }

console.log(movie);

  return (
    <div className="p-4">
      <Navboard handleSearch={handleSearch} handleOpen={handleOpen} title="List Movie" add="ADD MOVIE" />
      <ModalMovie errors={errors} handleChoose={handleChoose} handleSelect={handleSelect} categories={categories} characters={characters} actors={actors} movie={movie} setMovie={setMovie} open={open} handleClose={handleClose}  setErrors={setErrors} handleOpenadd={handleOpenadd} />
      <ModalAdd openadd={openadd} handleCloseadd={handleCloseadd} dataChoose={dataChoose} typeChoose={typeChoose} handleSelect={handleSelect} selectedItems={getSelectedItems()} />
    </div>
  );
}

export default Movie;