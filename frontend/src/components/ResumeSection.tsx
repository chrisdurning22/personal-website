import React, { ChangeEvent } from 'react';
import { Button, Card } from 'react-bootstrap';
import { NoState, Section } from '../types/types';

type ResumeSectionProps = {
  id: number;
  isActive: boolean;
  title: string;
  content: string;
  isTitleValid: boolean;
  isContentValid: boolean;
  handleContentChange: (e: ChangeEvent<HTMLTextAreaElement>, id: number) => void;
  handleTitleChange: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  setSelectedSection: (editMode: boolean, id: number) => void;
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
  isUserLoggedIn: boolean;
}

type ResumeSectionState = {
  resumeSection: Section
}

class ResumeSection extends React.Component<ResumeSectionProps, ResumeSectionState> {

  constructor(props: any) {
    super(props);
  }

  deleteSection(id: number) {

  }

  updateSection(id: number) {

  }

  render() {
    return (
        <Card>
            { this.props.isUserLoggedIn &&
              <Card.Header>
                {this.props.isActive ?
                  <div>
                    <Button variant="secondary" className="float-end" onClick={() => this.props.setSelectedSection(false, -1)}>Cancel</Button>
                    <Button variant="secondary" className="float-end margin-right-5" onClick={() => this.updateSection(this.props.id)}>Save</Button>
                  </div> 
                  :
                  <div>
                    <Button variant="primary" className="float-end" onClick={() => this.deleteSection(this.props.id)}>Delete</Button>
                    <Button variant="primary" className="float-end margin-right-5" onClick={() => this.props.setSelectedSection(true, this.props.id)}>Edit</Button>
                  </div>
                }
              </Card.Header>
            }
            <Card.Body>
              { this.props.isActive ?
                <div>
                <label>Title:</label>
                <Card.Title>
                    <input 
                        type="text" 
                        className={"input-title " + (this.props.isTitleValid ? "" : "invalid-input")}
                        value={this.props.title} 
                        onChange={(e) => this.props.handleTitleChange(e, this.props.id)}
                    />
                    {!this.props.isTitleValid && <label className="invalid-label">This field is required</label>}
                </Card.Title>
                <label>Content:</label>
                <Card.Text>
                    <textarea 
                        className={"textarea-content " + (this.props.isContentValid ? "" : "invalid-input")}
                        value={this.props.content} 
                        onChange={(e) => this.props.handleContentChange(e, this.props.id)}
                    />
                    {!this.props.isContentValid && <label className="invalid-label">This field is required</label>}
                </Card.Text>
                </div>
                :
                <div>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
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