import React, {
  useCallback, useState, useEffect, useMemo,
} from 'react';
import {useMutation} from '@apollo/client';
import {HiOutlineX} from 'react-icons/hi';
import {BsXLg} from 'react-icons/bs';

import useCategoryIcon from '@hooks/useCategoryIcon';
import useToast from '@hooks/useToast';
import {UPDATE_HAPPENING_SURVEY} from '@services/queries';

import {SurveyDataType} from '@components/SurveyTable';
import useToggle from '@ra/hooks/useToggle';
import usePrevious from '@hooks/usePrevious';
import cs from '@utils/cs';

import FileInput from '@ra/components/Form/FileInput';

import tree from '@images/category-tree.png';

import {AiOutlinePlus} from 'react-icons/ai';
import CategorySelect from './CategorySelect';
import SentimentInput from './SentimentInput';
import ImprovementInput from './ImprovementInput';
import ViewOptionInput from './ViewOptionInput';
import DataOptionInput from './DataOptionInput';

import classes from './styles';

interface Props {
    data: SurveyDataType | null;
    onClose: () => void;
}

const ImageItem = ({item, onRemove} : {item: string; onRemove: any}) => {
  const handleRemove = useCallback(() => onRemove(item), [item, onRemove]);
  return (
    <div className='relative'>
      <img
        src={item}
        alt='img'
        className={classes.photo}
      />
      <div onClick={handleRemove} className={cs(classes.imageDeleteIcon, 'hidden')}>
        <BsXLg size={10} />
      </div>
    </div>
  );
};

const Title = ({title}: {title: string}) => (
  <div className={classes.titleWrapper}>
    <h4 className={classes.titleText}>{title}</h4>
  </div>
);

const EditSurveyModal: React.FC<Props> = ({data, onClose}) => {
  const [error, setError] = useState<string>('');

  const [activeFeel, setActiveFeel] = useState(data?.sentiment || '');
  const [activeImprovement, setActiveImprovement] = useState(data?.improvement || '');
  const [title, setTitle] = useState(data?.title);
  const [description, setDescription] = useState(data?.description || '');
  const [locationName, setLocationName] = useState<string>('');
  const [category, setCategory] = useState<any>(data?.category);
  const [photos, setPhotos] = useState<any>();

  const toast = useToast();
  const prevCategory = usePrevious(category || data?.category);
  const [categoryIcon] = useCategoryIcon(category?.id || data?.category?.id);
  const [isDisableTitleInput, toggleDisableTitleInput] = useToggle(false);
  const [isPublic, toggleIsPublic] = useToggle(data?.isPublic || false);
  const [isTest, toggleIsTest] = useToggle(data?.isTest || false);
  const [showCategoryModal, toggleCategoryModal] = useToggle(false);

  const [updateHappeningSurvey, {loading}] = useMutation(UPDATE_HAPPENING_SURVEY, {
    onCompleted: () => {
      toast('success', 'Survey has been successfully updated !!');
      onClose();
    },
    onError: (err) => {
      setError(String(err));
      toast('error', String(err));
    },
  });

  const handleUpdateSurvey = useCallback(async () => {
    const surveyInput = {
      title,
      categoryId: parseInt(category?.id, 10),
      sentiment: activeFeel,
      attachment: photos || null,
      improvement: activeImprovement || null,
      description,
      isPublic,
      isTest,
    };
    await updateHappeningSurvey({
      variables: {
        input: surveyInput,
        id: data?.id,
      },
    });
  }, [
    activeFeel,
    activeImprovement,
    category?.id,
    data?.id,
    description,
    isPublic,
    isTest,
    photos,
    title,
    updateHappeningSurvey,
  ]);

  useEffect(() => prevCategory?.id !== category?.id && toggleCategoryModal(false), [
    category, category?.id, prevCategory, prevCategory?.id, toggleCategoryModal,
  ]);

  const handleAddImages = useCallback(({files}) => {
    setPhotos([...files]);
  }, []);

  const allImages = useMemo(() => {
    const images = [];
    if (photos) {
      for (let i = 0; i < photos.length; i += +1) {
        images.push(URL.createObjectURL(photos[i]));
      }
      return images;
    } return null;
  }, [photos]);

  const handleRemoveImage = useCallback(() => {
    // todo remove image
  }, []);

  const handleDeleteImage = useCallback(() => {
    // todo delete image
  }, []);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [],
  );

  const handleDescriptionChange = useCallback((event) => setDescription(event.target.value), []);

  const getLocationName = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${data?.location?.coordinates[0] || 0
        },${data?.location?.coordinates[1] || 0}.json?types=place&access_token=${process.env.REACT_APP_MAPBOX_TOKEN
        }`,
      );
      const resData: {
        features: [{place_name?: string}];
      } = await response.json();
      if (resData.features[0]?.place_name) {
        setLocationName(resData.features[0].place_name);
      }
    } catch (err: any) {
      setError(err);
    }
  }, [data?.location?.coordinates]);

  useEffect(() => {
    getLocationName();
  }, [getLocationName]);

  return (
    <div className={classes.modal}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.closeModalIcon} onClick={onClose}>
            <HiOutlineX size={24} />
          </div>
          <button onClick={handleUpdateSurvey} className={classes.button} type='button' disabled={!error && loading}>
            <span className='material-symbols-rounded'>done</span>
            <span>Save</span>
          </button>
        </div>
        <div>
          <div className='flex items-center gap-1 w-fit'>
            <input
              className={cs(classes.surveyTitle, !isDisableTitleInput ? 'border border-[#CEDCEC]' : 'bg-transparent')}
              value={title}
              onChange={handleTitleChange}
              disabled={isDisableTitleInput}
            />
            <div onClick={toggleDisableTitleInput} className='grid place-item-center'>
              <span className='material-symbols-rounded text-[24px] text-[#70747E] cursor-pointer'>
                border_color
              </span>
            </div>
          </div>
          <Title title='CATEGORY' />
          <div className={classes.categoryContent}>
            <div className={classes.categoryWrapper}>
              <img
                src={categoryIcon || tree}
                alt='category'
                className={classes.categoryImg}
              />
              <p className={classes.categoryTitle}>{category?.name || data?.category?.title}</p>
            </div>
            <div onClick={toggleCategoryModal} className={classes.changeButton}>Change</div>
          </div>
          <div
            className={cs(classes.categoryModalOverlay, [
              'hidden',
              showCategoryModal,
            ])}
          >
            <CategorySelect onClose={toggleCategoryModal} handleSelect={setCategory} />
          </div>
          <Title title='PHOTOS' />
          <div className={classes.photosWrapper}>
            {data?.attachment?.length ? data.attachment.map((item: {media: string}) => (
              <ImageItem item={item.media} onRemove={handleDeleteImage} />
            )) : ''}
            {allImages?.map((item) => (
              <ImageItem item={item} onRemove={handleRemoveImage} />
            ))}
            <div className={classes.uploadButton}>
              <FileInput
                id='surveyPhoto'
                className={classes.imageInput}
                accept='image/*'
                onChange={handleAddImages}
                multiple
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor='surveyPhoto' className='cursor-pointer'>
                <AiOutlinePlus size={25} color='#FFF' />
              </label>
            </div>
          </div>
          <Title title='LOCATION' />
          <p className={classes.fieldValue}>{locationName || ''}</p>
          <Title title='FEELS' />
          <SentimentInput activeFeel={activeFeel} onChange={setActiveFeel} />
          <Title title='IMPROVEMENT' />
          <ImprovementInput activeImprovement={activeImprovement} onChange={setActiveImprovement} />
          <Title title='DESCRIPTION' />
          <textarea
            className={classes.textarea}
            defaultValue={description}
            onChange={handleDescriptionChange}
          />
          <Title title='WHO CAN SEE THE SURVEY?' />
          <ViewOptionInput
            activeOptionItem={isPublic}
            onClick={toggleIsPublic}
          />
          <Title title='Is this the real data or a test point?' />
          <DataOptionInput
            activeOptionItem={isTest}
            onClick={toggleIsTest}
          />
        </div>
      </div>
    </div>
  );
};

export default EditSurveyModal;