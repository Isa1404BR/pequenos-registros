import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 480px;
  margin: 0 auto;
`

export const Title = styled.h1`
  font-size: 1.25rem;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const FieldRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;

  > *:first-child {
    flex: 2;
  }

  > *:last-child {
    flex: 1;
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`
