import * as Yup from 'yup';

export default Yup.object({
  rating: Yup.number()
    .oneOf([1, 2, 3, 4], 'Rating must be between 1 to 4.')
    .required('Required'),
  // add unique validation
  extra: Yup.array()
    .of(
      Yup.string().oneOf(
        [
          'HARD_REMOVAL',
          'SECRET',
          'SMALL_REMOVAL',
          'FAST',
          'TEMPO',
          'GENERAL',
          'VALUE',
          'MIN_GEN',
          'DAMAGE',
          'BUFF',
          'HEAL',
          'CARD_DRAW',
          'AOE',
          'STALL',
        ],
        'Extra attribute is not valid.',
      ),
    )
    .required('Required'),
});
