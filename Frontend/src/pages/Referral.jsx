import { Alert, Button, Label, Modal, TextInput } from "flowbite-react";
import React from "react";
import referHeroImg from "../assets/referHero.png";
import money from "../assets/money.png";
import CustomizedProgressBars from "../components/spinner/CustomizedProgressBars";
import { MdEmail } from "react-icons/md";
import { FaUser, FaUserFriends } from "react-icons/fa";

function Referral({ openModal, setOpenModal }) {
  const [formData, setFormData] = React.useState({});
  const [publishError, setPublishError] = React.useState(null);
  const [referSuccess, setReferSuccess] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://accredianpr.onrender.com/api/v1/referral/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        setLoading(false);
        setFormData({});
        setReferSuccess(null);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setReferSuccess("Thank you for your referral !!!");
        setLoading(false);
        setFormData({});
        // Set a timer to deactivate the success message and clear the form after 1 minute
        setTimeout(() => {
          setReferSuccess(null);
          setFormData({});
        }, 60000); // 60000 milliseconds = 1 minute
      }
    } catch (error) {
      setPublishError("Something went wrong", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setReferSuccess(null);
  }, []);

  return (
    <>
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size='4xl'
      >
        <Modal.Header>Refer with your friends and earn 💵💵</Modal.Header>
        <Modal.Body className='p-0'>
          <div className='grid grid-cols-2 bg-[#eef5ff] relative overflow-hidden'>
            <img
              src={money}
              alt='money'
              className='absolute -top-3 right-3 h-14 w-14 rotate-180'
            />
            <img
              src={money}
              alt='money'
              className='hidden md:block absolute -top-3 left-0 h-14 w-14 rotate-90'
            />
            <div className='px-10 py-5 flex justify-center items-center'>
              <form
                className='flex flex-col gap-3 w-full'
                onSubmit={handleSubmit}
              >
                {publishError && (
                  <Alert className='mt-5' color='failure'>
                    {publishError}
                  </Alert>
                )}

                <Label value='User Name' />
                <TextInput
                  type='referredBy'
                  placeholder='User Name'
                  required
                  id='referredBy'
                  addon={<FaUser size='20' />}
                  onChange={handleChange}
                  value={formData.referredBy}
                  className='focus:ring-0'
                />

                <Label value='Refer Friend Name' />
                <TextInput
                  type='name'
                  placeholder='Refer Friend Name'
                  required
                  id='name'
                  addon={<FaUserFriends size='20' />}
                  onChange={handleChange}
                  value={formData.name}
                  className='focus:ring-0'
                />

                <Label value='Refer Friend Email' />
                <TextInput
                  type='email'
                  placeholder='name@Company.com'
                  required
                  id='email'
                  addon={<MdEmail size='20' />}
                  onChange={handleChange}
                  value={formData.email}
                  className='focus:ring-0'
                />
                {referSuccess && (
                  <Alert className='mt-5' color='success'>
                    {referSuccess}
                  </Alert>
                )}
                {loading ? (
                  <>
                    <CustomizedProgressBars />
                  </>
                ) : (
                  <Button
                    type='submit'
                    className='bg-gradient-to-r from-[#00A6AA] via-slate-400 to-[#00A6AA] border-solid border-x border-y border-black'
                    disabled={loading}
                  >
                    Refer Now
                  </Button>
                )}
              </form>
            </div>
            <div className=' relative'>
              <img src={referHeroImg} alt='refer-hero' className='z-40' />
              <img
                src={money}
                alt='money'
                className='hidden md:block absolute bottom-10 left-16 h-14 w-14 rotate-90'
              />
              <img
                src={money}
                alt='money'
                className='hidden md:block absolute top-8 left-48 h-14 w-14 rotate-180'
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Referral;
