import { useEffect, useState, useContext } from 'react';
import InputField from '../../components/InputField';
import axios from '../../config/axios';
import { EditOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import './style.css';
import UserContext from '../../context/UserContext';

function ModalEditList({ setEditList, editList, teams, fetchProject }) {
  const { setUserProject } = useContext(UserContext);
  const [value, setValue] = useState({});
  const [validate, setValidate] = useState({ password: false, username: false });
  const [editedList, setEditedList] = useState(false);
  const [editComment, setEditComment] = useState(false);

  const valueGet = (fieldValue, field, isAlert) => {
    setValue({ ...value, [field]: fieldValue });
    isAlert ? setValidate({ ...validate, [field]: false }) : setValidate({ ...validate, [field]: true });
  };

  const fetchList = async () => {
    try {
      const res = await axios.get(`todos/getEditList/${editList.id}`);
      setEditList(res.data);
      setValue({
        newComment: '',
        deadline: res.data.list_deadline,
        list: res.data.list,
        description: res.data.description,
        score: res.data.score,
      });
      const res1 = await axios.get('users/getProjectList');
      localStorage.setItem('userProject', JSON.stringify(res1.data.userProject));
      setUserProject(res1.data.userProject);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const descriptionStyle = {
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--secondaryDarkest-color)',
    width: '100%',
    alignItems: 'center',
  };

  const sendEditList = () => {
    axios
      .patch('todos/editList', { ...value, list_id: editList.id })
      .then((res) => {
        notification.success({
          description: 'Already updated',
        });
        fetchList();
        fetchProject();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          description: 'Update Not Success',
        });
      });
  };
  const sendComment = () => {
    axios
      .post('comments/addNewComment', { comment: value.newComment, list_id: editList.id })
      .then((res) => {
        fetchList();
        // fetchProject();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          description: 'Comment Not Success',
        });
      });
  };

  const onEditComment = () => {};
  const onDeleteComment = () => {};

  const btnStyle = { width: '30%', minWidth: '60px' };
  return (
    <div>
      <div className="modal">
        <div className="modal-header">
          {editedList ? (
            <InputField
              name="list"
              defaultValue={value.list}
              label="LIST:"
              type="text"
              getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
              format="text"
              maxLength={128}
              minLength={1}
              need={true}
              width="100%"
              primaryColor={true}
            />
          ) : (
            editList.list
          )}
        </div>
        <div className="modal-body modal-body-2col">
          <div className="modal-todo">
            <div style={{ width: '100%', color: 'var(--thirdaryDarkest-color)' }}>
              <div className="list-assign" style={{ justifyContent: 'flex-start' }}>
                ASSIGN TO:&nbsp;&nbsp;&nbsp;
                {editList.Assigns
                  ? editList.Assigns.map((user) => {
                      console.log(user);
                      const targetUser = teams.filter((member) => member.id === user.user_id)[0];
                      console.log(targetUser);
                      return user.user_status === 'UNDERTAKE' && targetUser ? (
                        <img src={targetUser.User.image} style={{ border: `2px solid ${targetUser.User.color}` }} />
                      ) : null;
                    })
                  : null}
                <EditOutlined onClick={() => setEditedList(true)} />
              </div>
            </div>
            <div className="list-todo">
              {editList.type === 'PICTURE' ? (
                <div style={descriptionStyle}>
                  PICTURE
                  <div className="list-todo">
                    <img src={editList.description} alt={editList.list} style={{ width: '95%' }} />
                  </div>
                </div>
              ) : (
                <div style={descriptionStyle}>
                  {editedList ? (
                    <InputField
                      name="description"
                      defaultValue={value.description}
                      label="DESCRIPTION:"
                      type="text"
                      getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
                      format="text"
                      maxLength={500}
                      width="100%"
                    />
                  ) : (
                    <>
                      DESCRIPTION
                      <div className="list-todo">{editList.description}</div>
                    </>
                  )}
                  {editedList ? (
                    <div className="list-mark">
                      <InputField
                        name="score"
                        defaultValue={value.score}
                        label="SCORE:"
                        type="number"
                        getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
                        format="number"
                        width="30%"
                        allowLessWidth={true}
                        need={true}
                      />
                      <InputField
                        name="deadline"
                        defaultValue={value.deadline}
                        label="DEADLINE:"
                        type="date"
                        getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
                        format="date"
                        width="70%"
                        allowLessWidth={true}
                        need={true}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="list-mark">
                        <div className="list-deadline">SCORE: {editList.score}</div>
                        <div className="list-deadline">
                          DEADLINE: {editList.list_deadline ? editList.list_deadline : null}
                        </div>
                      </div>
                      <div className="list-mark">
                        <span className="list-deadline" style={{ fontSize: '8px' }}>
                          CREATED: {editList.created_at ? editList.created_at.slice(0, 9) : null}
                        </span>
                        <span className="list-deadline" style={{ fontSize: '8px' }}>
                          UPDATED: {editList.updated_at ? editList.updated_at.slice(0, 9) : null}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            {editedList ? (
              <div style={{ display: 'flex' }}>
                <button className="btn-submit btn-submit-modal" style={btnStyle} onClick={() => setEditedList(false)}>
                  BACK
                </button>
                <button className="btn-submit btn-submit-modal" style={btnStyle} onClick={sendEditList}>
                  SAVE
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex' }}>
                <InputField
                  name="newComment"
                  label="Add comment:"
                  type="text"
                  getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
                  format="text"
                  maxLength={256}
                  minLength={3}
                  width="70%"
                />
                <button className="btn-submit" style={btnStyle} onClick={sendComment}>
                  CREATE
                </button>
              </div>
            )}
          </div>
          <div className="modal-comment">
            {editList.Comments
              ? editList.Comments.map((comment) => {
                  const userPost = teams.filter((member) => member.id === comment.user_id)[0];
                  const btnEditComment = {
                    width: '40px',
                    height: '30%',
                    borderColor: 'var(--secondary-color)',
                    color: 'var(--secondaryDarkest-color)',
                    backgroundColor: 'white',
                  };
                  return editComment && editComment.id === comment.id ? (
                    <div style={{ display: 'flex' }}>
                      <InputField
                        name="editComment"
                        label="Edit comment:"
                        type="text"
                        getValue={(value, field, isAlert) => valueGet(value, field, isAlert)}
                        format="text"
                        maxLength={256}
                        minLength={3}
                        width="70%"
                      />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '20%',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <button style={btnEditComment} onClick={() => setEditComment(false)}>
                          BACK
                        </button>
                        <button style={btnEditComment} onClick={onEditComment}>
                          EDIT
                        </button>
                        <button style={btnEditComment} onClick={onDeleteComment}>
                          DELETE
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setEditComment({ id: comment.id, content: '', list_id: comment.list_id });
                      }}
                      style={{ borderTop: '3px var(--secondary-color) solid', width: '90%', textAlign: 'left' }}
                    >
                      <div>{comment.content}</div>
                      <div className="list-mark" style={{ color: 'var(--secondary-color)' }}>
                        <div className="list-deadline">{userPost.User.username}</div>
                        <div className="list-deadline">
                          {comment.created_at ? comment.created_at.slice(0, 9) : null}
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn-submit btn--primary btn-submit-modal"
            onClick={() => {
              setEditList(null);
            }}
          >
            BACK
          </button>
        </div>
      </div>
      <div className="modal-wrap"></div>
    </div>
  );
}

export default ModalEditList;