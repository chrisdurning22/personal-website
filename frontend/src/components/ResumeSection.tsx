import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCancel, faSave } from '@fortawesome/free-solid-svg-icons'
import React, { ChangeEvent } from 'react';
import { Button, Card } from 'react-bootstrap';
import Api from '../api/api';
import { TemporarySectionId } from '../constants/helperEnums';
import { Section } from '../types/types';

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

type ResumeSectionState = {
  sectionBeforeEdit: Section
}

class ResumeSection extends React.Component<ResumeSectionProps, ResumeSectionState> {
  api: Api;

  constructor(props: any) {
    super(props);
    this.state = {
      sectionBeforeEdit: {
        id: this.props.id,
        title: this.props.title,
        content: this.props.content
      }
    }
    this.api = new Api();
  }

  /**
   * Deletes the section from the APi and the sections array
   * @param id The unique section id
   */
  deleteSection(id: number) {
    this.api.deleteSection(id)
      .then(() => {
        // remove section from sections list
        this.props.deleteSection(id);
      })
      .catch((err) => {
        console.log('err ', err);
      });
  }

  /**
   * Saves the new or updated section
   * @param id The unique section id
   */
  saveSection(id: number) {
    const sectionObject: Section = {
      id: id,
      title: this.props.title,
      content: this.props.content
    }

    if(id === TemporarySectionId.Add) {
      this.api.addSection(sectionObject)
        .then((res) => {
          this.props.getAndSetAllSections()

          // unselect section
          this.props.setSectionSelectedForEdit(false, -1)
        })
        .catch((err) => {
          console.log('err ', err);
        })
    }
    else {
      this.api.updateSection(sectionObject, id)
        .then(() => {
          // unselect section
          this.props.setSectionSelectedForEdit(false, -1)
        })
        .catch((err) => {
          console.log('err ', err);
        });
    } 
  }

  /**
   * Ejects section from edit mode back to read only mode
   */
  cancelEdit(): void { 
    if(this.state.sectionBeforeEdit.id !== TemporarySectionId.Add) {
      this.props.setSection(this.state.sectionBeforeEdit);
    }
    else {
      this.props.deleteSection(this.state.sectionBeforeEdit.id);
    }
    
    this.props.setSectionSelectedForEdit(false, -1);
  }

  render() {
    return (
        <Card
          text={'light'}
        >
            { this.props.isUserLoggedIn &&
              <Card.Header>
                {this.props.isActive ?
                  <div>
                    <Button variant="secondary" className="float-end" onClick={() => this.cancelEdit()}>
                      <label className="section-button-label">Cancel</label><i><FontAwesomeIcon icon={faCancel} size={"1x"}/></i>
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="float-end margin-right-5" 
                      disabled={!this.props.isTitleValid || !this.props.isContentValid} 
                      onClick={() => this.saveSection(this.props.id)}>
                        <label className="section-button-label">Save</label><i><FontAwesomeIcon icon={faSave} size={"1x"}/></i>
                    </Button>
                  </div> 
                  :
                  <div>
                    <Button variant="primary" className="float-end" onClick={() => this.deleteSection(this.props.id)}>
                      <label className="section-button-label">Delete</label><i><FontAwesomeIcon icon={faTrash} size={"1x"}/></i>
                    </Button>
                    <Button variant="primary" className="float-end margin-right-5" onClick={() => this.props.setSectionSelectedForEdit(true, this.props.id)}>
                      <label className="section-button-label">Edit</label><i><FontAwesomeIcon icon={faEdit} size={"1x"}/></i>
                    </Button>
                  </div>
                }
              </Card.Header>
            }
            <Card.Body>
              { this.props.isActive ?
                <div>
                <label>Title:</label>
                <input 
                    type="text" 
                    className={"input-title " + (this.props.isTitleValid ? "" : "invalid-input")}
                    value={this.props.title} 
                    onChange={(e) => this.props.handleTitleChange(e, this.props.id)}
                />
                {!this.props.isTitleValid && <label className="invalid-label">This field is required</label>}
                <label>Content:</label>
                <textarea 
                    className={"textarea-content " + (this.props.isContentValid ? "" : "invalid-input")}
                    value={this.props.content} 
                    onChange={(e) => this.props.handleContentChange(e, this.props.id)}
                />
                {!this.props.isContentValid && <label className="invalid-label">This field is required</label>}
                </div>
                :
                <div className="section-wrapper">
                    <h3 className="margin-top-10 margin-bottom-20">
                      {this.props.title}
                    </h3>
                    <Card.Text style={{whiteSpace: `pre-line`}}>
                      {this.props.content}
                    </Card.Text>
                </div>
              }
            </Card.Body>
        </Card>
    );
  }
}

export default ResumeSection;