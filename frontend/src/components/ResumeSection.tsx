import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCancel, faSave } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { TemporarySectionId } from '../constants/helperEnums';
import { Section } from '../types/types';
import { AddSection, DeleteSection, UpdateSection } from '../api/api';

type ResumeSectionProps = {
  id: number;
  isActive: boolean;
  title: string;
  content: string;
  isTitleValid: boolean;
  isContentValid: boolean;
  handleContentChange: (e: ChangeEvent<HTMLTextAreaElement>, id: number) => void;
  handleTitleChange: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  setSectionSelectedForEdit: (editMode: boolean, id: number) => void;
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
  isUserLoggedIn: boolean;
  deleteSection: (id: number) => void;
  setSection: (section: Section) => void;
  getAndSetAllSections: () => void;
}

function ResumeSection({
  id,
  isActive,
  title,
  content,
  isTitleValid,
  isContentValid,
  handleContentChange,
  handleTitleChange,
  setSectionSelectedForEdit,
  setIsUserLoggedIn,
  isUserLoggedIn,
  deleteSection,
  setSection,
  getAndSetAllSections
}: ResumeSectionProps) {
  const [sectionBeforeEdit] = useState({
    id,
    title,
    content
  });

  /**
   * Deletes the section from the APi and the sections array
   * @param id The unique section id
   */
  const onDeleteSection = (id: number) => {
    DeleteSection(id)
      .then(() => {
        // remove section from sections list
        deleteSection(id);
      })
      .catch((err) => {
        console.log('err ', err);
      });
  }

  /**
   * Saves the new or updated section
   * @param id The unique section id
   */
  const saveSection = (id: number) => {
    const sectionObject: Section = {
      id,
      title,
      content
    }

    if(id === TemporarySectionId.Add) {
      AddSection(sectionObject)
        .then((res) => {
          getAndSetAllSections()

          // unselect section
          setSectionSelectedForEdit(false, -1)
        })
        .catch((err) => {
          console.log('err ', err);
        })
    }
    else {
      UpdateSection(sectionObject, id)
        .then(() => {
          // unselect section
          setSectionSelectedForEdit(false, -1)
        })
        .catch((err) => {
          console.log('err ', err);
        });
    } 
  }

  /**
   * Ejects section from edit mode back to read only mode
   */
  const cancelEdit = (): void => { 
    if (sectionBeforeEdit.id !== TemporarySectionId.Add) {
      setSection(sectionBeforeEdit);
    }
    else {
      deleteSection(sectionBeforeEdit.id);
    }
    
    setSectionSelectedForEdit(false, -1);
  }

  return (
      <Card
        text={'light'}
      >
          { isUserLoggedIn &&
            <Card.Header>
              {isActive ?
                <div>
                  <Button variant="secondary" className="float-end" onClick={() => cancelEdit()}>
                    <label className="section-button-label">Cancel</label><i><FontAwesomeIcon icon={faCancel} size={"1x"}/></i>
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="float-end margin-right-5" 
                    disabled={!isTitleValid || !isContentValid} 
                    onClick={() => saveSection(id)}>
                      <label className="section-button-label">Save</label><i><FontAwesomeIcon icon={faSave} size={"1x"}/></i>
                  </Button>
                </div> 
                :
                <div>
                  <Button variant="primary" className="float-end" onClick={() => onDeleteSection(id)}>
                    <label className="section-button-label">Delete</label><i><FontAwesomeIcon icon={faTrash} size={"1x"}/></i>
                  </Button>
                  <Button variant="primary" className="float-end margin-right-5" onClick={() => setSectionSelectedForEdit(true, id)}>
                    <label className="section-button-label">Edit</label><i><FontAwesomeIcon icon={faEdit} size={"1x"}/></i>
                  </Button>
                </div>
              }
            </Card.Header>
          }
          <Card.Body>
            { isActive ?
              <div>
              <label>Title:</label>
              <input 
                  type="text" 
                  className={"input-title " + (isTitleValid ? "" : "invalid-input")}
                  value={title} 
                  onChange={(e) => handleTitleChange(e, id)}
              />
              {!isTitleValid && <label className="invalid-label">This field is required</label>}
              <label>Content:</label>
              <textarea 
                  className={"textarea-content " + (isContentValid ? "" : "invalid-input")}
                  value={content} 
                  onChange={(e) => handleContentChange(e, id)}
              />
              {!isContentValid && <label className="invalid-label">This field is required</label>}
              </div>
              :
              <div className="section-wrapper">
                  <h3 className="margin-top-10 margin-bottom-20">
                    {title}
                  </h3>
                  <Card.Text style={{whiteSpace: `pre-line`}}>
                    {content}
                  </Card.Text>
              </div>
            }
          </Card.Body>
      </Card>
  );
}


export default ResumeSection;