import * as React from 'react';
import { graphql } from 'gatsby';
import { styled } from 'gatsby-theme-stitches/src/stitches.config';
import { rem } from 'polished';
import { motion } from 'framer-motion';
import * as RadixAccordion from '@radix-ui/react-accordion';

import chevronIconUrl from '!!file-loader?modules!./faqAccordianItem/chevron.svg';

type FaqAccordianItemProps = {
  entry: GatsbyTypes.FaqAccordianItem_entryFragment,
  className?: string,
  open?: boolean,
  onClick?: (id: string) => void,
  onFocus?: (id: string) => void,
};

export const query = graphql`
  fragment FaqAccordianItem_entry on FaqEntry {
    id
    question
    answerHtml
  }
`;

const Container = styled('div', {
  borderBottom: '1px solid $gray200',
  '&:hover, &:focus-within, &:active': {
    backgroundColor: '$gray100',
  },
});

const Header = styled('h2', {
  display: 'flex',
  fontSize: '$body2',

  variants: {
    size: {
      sm: {
        fontSize: '$subtitle3',
      },
    },
  },
});

const Button = styled('button', {
  font: 'inherit',
  textAlign: 'left',
  outline: 'none',
  paddingX: rem(12),
  paddingY: rem(24),
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const ChevronIcon = styled('img', {
  width: rem(24),
  height: rem(24),
  transition: 'transform .3s',
  marginLeft: rem(12),

  variants: {
    rotate: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
});

const Panel = styled('div', {
  overflow: 'hidden',
});

const Content = styled('div', {
  paddingX: rem(12),
  paddingY: rem(32),
  '> p:not(:last-child)': {
    marginBottom: rem(40),
  },
});

const variants = {
  open: { height: 'auto' },
  collapsed: { height: 0 },
};

const transition = {
  duration: 0.8,
  ease: [0.04, 0.62, 0.23, 0.98],
};

const FaqAccordianItem: React.FC<FaqAccordianItemProps> = ({
  entry,
  className,
  onClick,
  onFocus,
  open = false,
}) => {
  return (
    <Container className={className}>
      <Header as="h2" size={{ '@sm': 'sm' }}>
        <Button
          id={entry.id}
          onClick={() => onClick?.(entry.id)}
          onFocus={() => onFocus?.(entry.id)}
        >
          {entry.question}
          <ChevronIcon
            rotate={open}
            src={chevronIconUrl}
            alt=""
            aria-hidden
          />
        </Button>
      </Header>
      <Panel>
        <motion.div
          variants={variants}
          transition={transition}
          initial="collapsed"
          animate={open ? 'open' : 'collapsed'}
        >
          <Content
            aria-hidden={!open}
            dangerouslySetInnerHTML={{ __html: entry.answerHtml }}
          />
        </motion.div>
      </Panel>
    </Container>
  );
}

export default FaqAccordianItem;