// import React, { useState } from 'react';
// import { Button, Input, Textarea } from '@chakra-ui/react';

// function Review() {
//   const [rating, setRating] = useState('');
//   const [review, setReview] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Validate the form fields
//     if (!rating || !review) {
//       setError('Please enter a rating and review.');
//       return;
//     }

//     // Send the data to the server to be saved
//     try {
//       const response = await fetch('/api/reviews', {
//         method: 'POST',
//         body: JSON.stringify({ rating, review }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save review.');
//       }

//       setSuccess(true);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Leave a Rating and Review</h1>

//       {error && <p>{error}</p>}
//       {success && <p>Thank you for your review!</p>}

//       <form onSubmit={handleSubmit}>
//         <label>
//           Rating:
//           <Input type="number" min="1" max="5" value={rating} onChange={(event) => setRating(event.target.value)} />
//         </label>

//         <label>
//           Review:
//           <Textarea value={review} onChange={(event) => setReview(event.target.value)} />
//         </label>

//         <Button type="submit">Submit</Button>
//       </form>
//     </div>
//   );
// }

// export default Review;