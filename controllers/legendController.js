import { StatusCodes } from 'http-status-codes';
import { Media,Topic} from '../models/database.js';
export const allmedia = async (req, res) => {
  const { mediaId } = req.params;
  try
  {
  const media = await Media.findById(mediaId);
  media.verified = true;
    await media.save(); // Save the updated media document

    return res.status(StatusCodes.OK).json({ msg: 'Media verified successfully', media });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'An error occurred', error: error.message });
  }
 
};

export const deletemedia = async (req, res) => {
  try {
    const { mediaId } = req.params;

    // Find the media document
    const media = await Media.findById(mediaId);
    if (!media) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Media not found' });
    }

    // Find the associated topic and remove the reference
    const topic = await Topic.findById(media.topics);
    if (topic) {
      topic.media.pull(mediaId);
      await topic.save();
    }

    // Delete the media document
    await Media.findByIdAndDelete(mediaId);

    res.status(StatusCodes.OK).json({ msg: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server error' });
  }
};