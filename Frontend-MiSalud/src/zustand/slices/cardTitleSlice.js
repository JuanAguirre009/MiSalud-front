
export const createCardTitleSlice = (set) => ({
    cardTitle: {
        title: '',
        subtitle: '',
        icon: null,
        bgColor: 'transparent',
      },
      setCardTitle: ({ infoCard }) =>
        set(() => ({
          cardTitle: {
            title: infoCard.title || '',
            subtitle: infoCard.subtitle || '',
            icon: infoCard.icon || null,
            bgColor: infoCard.bgColor || 'transparent',
          },
        })),
      
});