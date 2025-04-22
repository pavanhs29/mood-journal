import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export const moods = [
  {
    id: 'great',
    icon: SentimentVerySatisfiedIcon,
    label: 'Great',
    color: '#FFD700',
  },
  {
    id: 'good',
    icon: SentimentSatisfiedAltIcon,
    label: 'Good',
    color: '#90EE90',
  },
  {
    id: 'neutral',
    icon: SentimentNeutralIcon,
    label: 'Neutral',
    color: '#ADD8E6',
  },
  {
    id: 'bad',
    icon: SentimentDissatisfiedIcon,
    label: 'Bad',
    color: '#FFA07A',
  },
  {
    id: 'awful',
    icon: SentimentVeryDissatisfiedIcon,
    label: 'Awful',
    color: '#FF6347',
  },
];

export const moodObj = {
  great: { icon: SentimentVerySatisfiedIcon, label: 'Great', color: '#FFD700' },
  good: { icon: SentimentSatisfiedAltIcon, label: 'Good', color: '#90EE90' },
  neutral: { icon: SentimentNeutralIcon, label: 'Neutral', color: '#ADD8E6' },
  bad: { icon: SentimentDissatisfiedIcon, label: 'Bad', color: '#FFA07A' },
  awful: {
    icon: SentimentVeryDissatisfiedIcon,
    label: 'Awful',
    color: '#FF6347',
  },
};
