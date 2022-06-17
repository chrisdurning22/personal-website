import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Api from '../api/api';
import ResumeSection from './ResumeSection';
import { Section } from '../types/types';
import { TemporarySectionId } from '../constants/helperEnums';
import LoadingSkeleton from './LoadingSkeleton';

type ResumeSectionListProps = {
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
  isUserLoggedIn: boolean;
  setHomeLoading: (loading: boolean) => void
}

function ResumeSectionList({setIsUserLoggedIn, isUserLoggedIn, setHomeLoading}: ResumeSectionListProps) {
  const api = new Api();
  const [sections, setSections] = useState([]);
  const [sectionSelectedForEdit, setSectionSelectedForEdit] = useState({ 
                                                                editMode: false, 
                                                                id: TemporarySectionId.NoneSelected,
                                                                isTitleValid: true,
                                                                isContentValid: true  
                                                              });
  const [loading, setLoading] = useState(true);                                                 

  useEffect(() => {
    getAndSetAllSections();
  }, []);

  /**
   * Gets list of all sections from the API and sets them in the sections array
   */
  const getAndSetAllSections = () => {
    api.getSectionList()
      .then((res: any) => {
        setSections(res.map((section: any) => {
          return {
            id: section.id,
            title: section.title,
            content: section.content
          }
        }));

        setLoading(false);

        setHomeLoading(false);

      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }

  /**
   * Adds empty section to the sections array, sets the added section to selected for edit.
   */
   const addNewSection = () => {
    const tempSections: any = sections;
    tempSections.push({
      id: TemporarySectionId.Add,
      title: "",
      content: ""
    });

    setSections(tempSections);

    setSectionSelectedForEdit({ 
      editMode: true, 
      id: TemporarySectionId.Add,
      isTitleValid: sectionSelectedForEdit.isTitleValid,
      isContentValid: sectionSelectedForEdit.isContentValid
    });
  }

  /**
   * Deletes the specified section
   * @param id The unique section id
   */
  const deleteSection = (id: number) => {
    const tempSections = sections;
    const deleteIndex = sections.findIndex((section: Section) => id === section.id);
    
    // remove section at specified index
    tempSections.splice(deleteIndex, 1);

    setSections(tempSections);
  }

  /**
   * Overrides existing section
   * @param section The section object
   */
  const setSection = (section: Section) => {
    const index = sections.findIndex((element: Section) => section.id === element.id)
    const tempSections: any = sections;
    tempSections[index].title = section.title;
    tempSections[index].content = section.content;

    setSections(tempSections);
  }

  /**
   * Handles section title change
   * @param e The react event
   * @param id Unique value for each section
   */
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const tempSections: any = sections;
    const sectionIndex = sections.findIndex((section: Section) => id === section.id);

    tempSections[sectionIndex].title = e.target.value;

    setSections(tempSections);
    setSectionSelectedForEdit({
      editMode: sectionSelectedForEdit.editMode, 
      id: sectionSelectedForEdit.id,
      isContentValid: sectionSelectedForEdit.isContentValid,
      isTitleValid: e.target.value.length > 0 ? true : false
    })
  };

  /**
   * Handles section content change
   * @param e The react event
   * @param id Unique value for each section
   */
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>, id: number) => {
    const tempSections: any = sections;
    const sectionIndex = sections.findIndex((section: Section) => id === section.id);

    tempSections[sectionIndex].content = e.target.value;

    setSections(tempSections);
    setSectionSelectedForEdit({
      editMode: sectionSelectedForEdit.editMode, 
      id: sectionSelectedForEdit.id,
      isTitleValid: sectionSelectedForEdit.isContentValid,
      isContentValid: e.target.value.length > 0 ? true : false
    });
  };
  
  return (
    <div>
      <div className="sections-wrapper">
        <div className="sections-body">
          {
            sections.map((value: Section) => {
              return (
                <ResumeSection
                  key={value.id}
                  id={value.id}
                  isActive={sectionSelectedForEdit.id === value.id}
                  title={value.title}
                  content={value.content}
                  isTitleValid={sectionSelectedForEdit.isTitleValid}
                  isContentValid={sectionSelectedForEdit.isContentValid}
                  handleTitleChange={(e: ChangeEvent<HTMLInputElement>, index: number) => handleTitleChange(e, index)}
                  handleContentChange={(e: ChangeEvent<HTMLTextAreaElement>, index: number) => handleContentChange(e, index)}
                  setSectionSelectedForEdit={(editMode: boolean, id: number) => setSectionSelectedForEdit({editMode: editMode, id: id, isContentValid: sectionSelectedForEdit.isContentValid, isTitleValid: sectionSelectedForEdit.isTitleValid})}
                  setIsUserLoggedIn={(isUserLoggedIn: boolean) => setIsUserLoggedIn(isUserLoggedIn)}
                  isUserLoggedIn={isUserLoggedIn}
                  deleteSection={(id: number) => deleteSection(id)}
                  setSection={(section: Section) => setSection(section)}
                  getAndSetAllSections={() => getAndSetAllSections()}
                />
              )
            })
          }
          {
            loading &&
            <div>
              <LoadingSkeleton/>
              <LoadingSkeleton/>
              <LoadingSkeleton/>
            </div>
          }
        </div>
        {isUserLoggedIn && 
          <div className={sections.length > 0 ? "sections-footer" : "sections-footer-no-sections"}>
            <Button variant="primary" className="flex-align-center" disabled={sectionSelectedForEdit.editMode} onClick={() => addNewSection()}>
              <label className="add-button-label">Add</label>
              <i><FontAwesomeIcon icon={faSquarePlus} size={"2x"}/></i>
            </Button>
          </div>
        }
      </div>
    </div>
  );
}

export default ResumeSectionList;