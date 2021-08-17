import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import Message from "../components/error/Message";
import { USER_UPDATE_DETAILS_RESET } from "../constants/userConstants";
import { getUserDetails, updateUserDetails } from "../actions/userActions";
const UserInformationScreen = ({ history, match }) => {
  const userId = match.params.id;
  const [age, setAge] = useState(0);
  const [salary, setSalary] = useState(0);
  const [retirementAge, setRetirementAge] = useState(0);
  const dispatch = useDispatch();

  const userUpdateDetails = useSelector((state) => state.userUpdateDetails);
  const {
    loading: loadingUpdateDetails,
    success: successUpdateDetails,
    error: errorUpdateDetails,
  } = userUpdateDetails;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingUserDetails,
    user,
    error: errorUserDetails,
  } = userDetails;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserDetails({
        ...user,
        age,
        salary,
        retirementAge,
      })
    );
  };

  useEffect(() => {
    if (successUpdateDetails) {
      dispatch({
        type: USER_UPDATE_DETAILS_RESET,
      });
      history.push("/settings");
    } else if (!user || !user.firstName || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setAge(user.age ? user.age : 0);
      setSalary(user.salary ? user.salary : 0);
      setRetirementAge(user.retirementAge ? user.retirementAge : 0);
    }
  }, [dispatch, history, user, successUpdateDetails, userId]);

  return (
    <Layout>
      {loadingUserDetails && <Loading />}
      {errorUserDetails && <Message error={errorUserDetails} />}
      {loadingUpdateDetails && <Loading />}
      {errorUpdateDetails && <Message error={errorUpdateDetails} />}
      <div className="transactions-screen-container">
        <div className="transactions-screen-title">
          <h1 className="title">User Information</h1>
        </div>

        <div className="transactions-dashboard">
          <form
            className="user-info-form add-transaction"
            onSubmit={submitHandler}
          >
            <div className="add-transaction-input">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="add-transaction-input">
              <label htmlFor="salary">Salary</label>
              <input
                type="number"
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className="add-transaction-input">
              <label htmlFor="retirementAge">Retirement Age</label>
              <input
                type="number"
                id="retirementAge"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
              />
            </div>
            <button className="add-transaction-btn" type="submit">
              Update Information
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserInformationScreen;
