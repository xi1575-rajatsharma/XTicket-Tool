import styled from "styled-components";


export const modalOverlay  = styled.div`
    background-color: rgba(0, 0, 0, 0.2);
    height: 100%;
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 10;
    opacity: 0.2;
  `;
  
  export const modalDialog  = styled.div`
    --xe-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--xe-bg-opacity));
    border-radius: 0.75rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 6.5rem;
    max-width: 100%;
    width: 40rem;
  `;
  export const modalDialogcontent  = styled.div`
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  `
  
  export const modalDialogTitle  = styled.div`
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.75rem;
    margin-bottom: 0.5rem;
    --xe-text-opacity: 1;
    color: rgba(17, 24, 39, var(--xe-text-opacity));
    text-align:center;
  `
  
  export const modalDialogDescription  = styled.div`
    font-size: 0.975rem;
    line-height: 1.25rem;
    margin-bottom: 1rem;
    --xe-text-opacity: 1;
    color: rgba(107, 114, 128, var(--xe-text-opacity));
    text-align:center;
  `
  export const modalDialogFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    padding-bottom: 1rem;
  `
  
  export const modalDialogOk  = styled.div`
    --xe-bg-opacity: 1;
    background-color: rgba(254, 226, 226, var(--xe-bg-opacity));
    border-radius: 0.75rem;
    font-weight: 500;
    margin-right: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
    cursor: pointer;
    &:focus{
        outline-offset: 2px;
        outline: 2px solid transparent;
    }
    &:hover{
        --xe-bg-opacity: 1;
        background-color: rgba(252, 165, 165, var(--xe-bg-opacity));
        --xe-text-opacity: 1;
        color: rgba(153, 27, 27, var(--xe-text-opacity));
    }
`
